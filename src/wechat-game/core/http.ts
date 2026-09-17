import { getWx, type WxRequestMethod } from '../platform/wechat';
import type { CookieJar } from './cookieJar';
import { llmByokHeaders } from './llmConfig';
import { describeWechatNetworkFailure } from './wechatNetworkError';

export class HttpRequestError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly body: unknown,
  ) {
    super(message);
    this.name = 'HttpRequestError';
  }
}

export interface HttpRequestOptions {
  method?: WxRequestMethod;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
}

function joinUrl(baseUrl: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

function errorMessage(body: unknown, fallback: string): string {
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>;
    if (typeof record.error === 'string' && record.error) return record.error;
    if (typeof record.message === 'string' && record.message) return record.message;
  }
  return fallback;
}

export class WechatHttpClient {
  constructor(
    private getBaseUrl: () => string,
    private readonly cookieJar: CookieJar,
  ) {}

  request<T>(path: string, options: HttpRequestOptions = {}): Promise<T> {
    const method = options.method ?? 'GET';
    const cookie = this.cookieJar.readHeader();
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(options.data !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...llmByokHeaders(),
      ...options.headers,
      ...(cookie ? { Cookie: cookie } : {}),
    };

    return new Promise<T>((resolve, reject) => {
      getWx().request<T>({
        url: joinUrl(this.getBaseUrl(), path),
        method,
        data: options.data,
        header: headers,
        timeout: options.timeout ?? 10_000,
        success: (response) => {
          this.cookieJar.capture(response.cookies);
          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(
              new HttpRequestError(
                errorMessage(response.data, `HTTP ${response.statusCode}`),
                response.statusCode,
                response.data,
              ),
            );
            return;
          }
          resolve(response.data);
        },
        fail: (error) => {
          reject(new Error(describeWechatNetworkFailure(error.errMsg, joinUrl(this.getBaseUrl(), path))));
        },
      });
    });
  }
}
