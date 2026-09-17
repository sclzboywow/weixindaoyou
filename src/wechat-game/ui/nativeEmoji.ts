export const NATIVE_EMOJI_GLYPHS = [
  '💰',
  '📦',
  '🌕',
  '📜',
  '🎁',
  '🔥',
  '🧘',
  '🗡️',
  '⚡',
  '📖',
  '🌱',
  '☑',
  '⚔️',
  '🏵️',
  '☯️',
  '💧',
  '🫧',
  '👤',
  '⛰️',
  '📘',
  '🌿',
  '👁️',
  '💡',
  '💊',
  '🍃',
  '🌞',
  '🗺️',
  '📚',
  '👊',
  '🛖',
  '🪞',
  '🔨',
  '🏮',
  '⏳',
  '🪶',
  '☠️',
  '💫',
  '📢',
  '🪨',
  '🌑',
  '✨',
  '🏔️',
  '⚠️',
  '🏃',
  '🥁',
  '🔮',
  '💬',
  '⚖️',
  '🏆',
  '🔔',
  '🌅',
  '☁️',
  '🗂️',
  '👥',
  '📝',
  '⚙️',
  '❤️',
  '🩸',
  '🕯️',
  '😰',
  '💥',
  '💪',
  '🦴',
  '🦶',
  '🐉',
  '💎',
  '🌪️',
  '❄️',
  '🛡️',
  '💍',
  '💨',
  '🎯',
  '💚',
  '🌀',
  '😈',
  '🌟',
  '🤐',
  '🔒',
  '💔',
  '🩹',
  '🪢',
  '🪷',
  '🌡️',
  '⛓️',
  '❔',
  '🍑',
] as const;

export type NativeEmojiGlyph = (typeof NATIVE_EMOJI_GLYPHS)[number];

const SORTED_NATIVE_EMOJI_GLYPHS = Array.from(
  new Set(
    NATIVE_EMOJI_GLYPHS.flatMap((glyph) => [
      glyph,
      glyph.replace(/[\ufe0e\ufe0f]/g, ''),
    ]),
  ),
).sort((left, right) => right.length - left.length);

export function nativeEmojiAssetCode(glyph: string): string {
  return Array.from(glyph.replace(/[\ufe0e\ufe0f]/g, ''))
    .map((character) => character.codePointAt(0)?.toString(16))
    .filter((value): value is string => Boolean(value))
    .join('-');
}

export interface NativeTextToken {
  kind: 'text' | 'emoji';
  value: string;
}

/** 真机 Canvas 会把部分 emoji 变体选择符画成缺字方框。 */
export function normalizeNativeCanvasText(text: string): string {
  return String(text ?? '').replace(/[\ufe0e\ufe0f]/g, '');
}

/**
 * Canvas on real iOS/Android devices delegates emoji to different system fonts.
 * Keep the repository's known pictograms as indivisible tokens so rendering and
 * wrapping can use the bundled Twemoji raster assets instead.
 */
export function splitNativeTextTokens(text: string): NativeTextToken[] {
  const source = normalizeNativeCanvasText(text);
  const tokens: NativeTextToken[] = [];
  let plain = '';
  let offset = 0;

  const flushPlain = () => {
    if (!plain) return;
    tokens.push({ kind: 'text', value: plain });
    plain = '';
  };

  while (offset < source.length) {
    const glyph = SORTED_NATIVE_EMOJI_GLYPHS.find((candidate) =>
      source.startsWith(candidate, offset),
    );
    if (glyph) {
      flushPlain();
      tokens.push({ kind: 'emoji', value: glyph });
      offset += glyph.length;
      continue;
    }
    const codePoint = source.codePointAt(offset);
    if (codePoint === undefined) break;
    const character = String.fromCodePoint(codePoint);
    plain += character;
    offset += character.length;
  }
  flushPlain();
  return tokens;
}

export function splitNativeTextUnits(text: string): string[] {
  return splitNativeTextTokens(text).flatMap((token) =>
    token.kind === 'emoji' ? [token.value] : Array.from(token.value),
  );
}
