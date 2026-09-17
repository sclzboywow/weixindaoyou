export function describeWechatNetworkFailure(message?: string, url?: string): string {
  const value = message?.trim() ?? '';
  if (/url not in domain list/i.test(value)) {
    const target = url?.replace(/[?#].*$/, '') ?? '当前接口';
    return `请求链路包含未配置域名：${target}`;
  }
  if (/timeout/i.test(value)) return '网络请求超时，请检查网络后重试';
  if (/ssl|certificate/i.test(value)) return '服务器证书校验失败，请稍后重试';
  return value || '微信网络请求失败';
}
