import type { KeyValueStorage } from '../platform/storage';

const COOKIE_STORAGE_KEY = 'daoyou.wechat.debug-cookie.v1';

function parseCookiePairs(raw: string): Map<string, string> {
  const pairs = new Map<string, string>();
  for (const part of raw.split(';')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const index = trimmed.indexOf('=');
    if (index <= 0) continue;
    const name = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (name) pairs.set(name, value);
  }
  return pairs;
}

function firstSetCookiePair(raw: string): [string, string] | null {
  const first = raw.split(';', 1)[0]?.trim() ?? '';
  const index = first.indexOf('=');
  if (index <= 0) return null;
  return [first.slice(0, index).trim(), first.slice(index + 1).trim()];
}

export class CookieJar {
  constructor(private readonly storage: KeyValueStorage) {}

  readHeader(): string {
    return this.storage.get(COOKIE_STORAGE_KEY, '').trim();
  }

  replace(rawCookieHeader: string): void {
    const normalized = Array.from(parseCookiePairs(rawCookieHeader).entries())
      .map(([name, value]) => `${name}=${value}`)
      .join('; ');
    if (normalized) {
      this.storage.set(COOKIE_STORAGE_KEY, normalized);
    } else {
      this.clear();
    }
  }

  capture(setCookies: readonly string[] | undefined): void {
    if (!setCookies?.length) return;
    const current = parseCookiePairs(this.readHeader());
    for (const raw of setCookies) {
      const pair = firstSetCookiePair(raw);
      if (!pair) continue;
      const [name, value] = pair;
      if (!value) current.delete(name);
      else current.set(name, value);
    }
    this.replace(
      Array.from(current.entries())
        .map(([name, value]) => `${name}=${value}`)
        .join('; '),
    );
  }

  hasCookies(): boolean {
    return Boolean(this.readHeader());
  }

  clear(): void {
    this.storage.remove(COOKIE_STORAGE_KEY);
  }
}
