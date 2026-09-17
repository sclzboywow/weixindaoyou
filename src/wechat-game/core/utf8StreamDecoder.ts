export interface Utf8StreamDecoder {
  decode(
    input?: ArrayBuffer | ArrayBufferView,
    options?: { stream?: boolean },
  ): string;
}

function bytesOf(input?: ArrayBuffer | ArrayBufferView): Uint8Array {
  if (!input) return new Uint8Array(0);
  if (input instanceof ArrayBuffer) return new Uint8Array(input);
  return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
}

class PortableUtf8StreamDecoder implements Utf8StreamDecoder {
  private pending = new Uint8Array(0);

  decode(
    input?: ArrayBuffer | ArrayBufferView,
    options: { stream?: boolean } = {},
  ): string {
    const incoming = bytesOf(input);
    const bytes = new Uint8Array(this.pending.length + incoming.length);
    bytes.set(this.pending, 0);
    bytes.set(incoming, this.pending.length);
    this.pending = new Uint8Array(0);

    const output: string[] = [];
    let offset = 0;
    while (offset < bytes.length) {
      const first = bytes[offset];
      if (first < 0x80) {
        output.push(String.fromCodePoint(first));
        offset += 1;
        continue;
      }

      const length = first >= 0xc2 && first <= 0xdf
        ? 2
        : first >= 0xe0 && first <= 0xef
          ? 3
          : first >= 0xf0 && first <= 0xf4
            ? 4
            : 0;
      if (!length) {
        output.push('\ufffd');
        offset += 1;
        continue;
      }
      if (offset + length > bytes.length) {
        if (options.stream) this.pending = bytes.slice(offset);
        else output.push('\ufffd');
        break;
      }

      const second = bytes[offset + 1];
      const third = length >= 3 ? bytes[offset + 2] : 0;
      const fourth = length === 4 ? bytes[offset + 3] : 0;
      const continuationValid =
        second >= 0x80 && second <= 0xbf &&
        (length < 3 || (third >= 0x80 && third <= 0xbf)) &&
        (length < 4 || (fourth >= 0x80 && fourth <= 0xbf));
      const scalarValid =
        continuationValid &&
        !(first === 0xe0 && second < 0xa0) &&
        !(first === 0xed && second >= 0xa0) &&
        !(first === 0xf0 && second < 0x90) &&
        !(first === 0xf4 && second > 0x8f);
      if (!scalarValid) {
        output.push('\ufffd');
        offset += 1;
        continue;
      }

      const codePoint = length === 2
        ? ((first & 0x1f) << 6) | (second & 0x3f)
        : length === 3
          ? ((first & 0x0f) << 12) | ((second & 0x3f) << 6) | (third & 0x3f)
          : ((first & 0x07) << 18) |
            ((second & 0x3f) << 12) |
            ((third & 0x3f) << 6) |
            (fourth & 0x3f);
      output.push(String.fromCodePoint(codePoint));
      offset += length;
    }
    return output.join('');
  }
}

export function createUtf8StreamDecoder(forcePortable = false): Utf8StreamDecoder {
  const NativeTextDecoder = (
    globalThis as typeof globalThis & {
      TextDecoder?: new (label?: string) => Utf8StreamDecoder;
    }
  ).TextDecoder;
  return !forcePortable && NativeTextDecoder
    ? new NativeTextDecoder('utf-8')
    : new PortableUtf8StreamDecoder();
}
