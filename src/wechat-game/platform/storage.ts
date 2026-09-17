import { getWx } from './wechat';

export interface KeyValueStorage {
  get<T>(key: string, fallback: T): T;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
}

export class WechatStorage implements KeyValueStorage {
  get<T>(key: string, fallback: T): T {
    const value = getWx().getStorageSync(key);
    return value === undefined || value === null || value === ''
      ? fallback
      : (value as T);
  }

  set<T>(key: string, value: T): void {
    getWx().setStorageSync(key, value);
  }

  remove(key: string): void {
    getWx().removeStorageSync(key);
  }
}
