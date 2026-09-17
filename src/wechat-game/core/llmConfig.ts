import { getWx } from '../platform/wechat';

export const WECHAT_LLM_STORAGE_KEY = 'daoyou.llm-config.v1';

export interface WechatLlmByokConfig {
  provider: string;
  apiKey: string;
  model: string;
}

export function readStoredWechatLlmConfig(): WechatLlmByokConfig | null {
  try {
    const raw = getWx().getStorageSync(WECHAT_LLM_STORAGE_KEY);
    if (!raw || typeof raw !== 'object') return null;
    const record = raw as Record<string, unknown>;
    const provider = typeof record.provider === 'string' ? record.provider.trim() : '';
    const apiKey = typeof record.apiKey === 'string' ? record.apiKey.trim() : '';
    const model = typeof record.model === 'string' ? record.model.trim() : '';
    if (!provider || !apiKey || !model) return null;
    return { provider, apiKey, model };
  } catch {
    return null;
  }
}

export function llmByokHeaders(): Record<string, string> {
  const cfg = readStoredWechatLlmConfig();
  if (!cfg) return {};
  return {
    'x-llm-provider': cfg.provider,
    'x-llm-api-key': cfg.apiKey,
    'x-llm-model': cfg.model,
  };
}
