import type { NativeDaoyouApi } from '../core/nativeClient';

export async function claimRedeemCode(
  api: NativeDaoyouApi,
  code: string,
): Promise<void> {
  await api.post('/api/cultivator/redeem-code/claim', {
    code: code.trim().toUpperCase(),
  });
}

export async function submitPlayerFeedback(
  api: NativeDaoyouApi,
  input: { type: string; content: string },
): Promise<void> {
  await api.post('/api/feedback', input);
}
