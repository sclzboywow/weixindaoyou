import type { NativeDaoyouApi } from '../core/nativeClient';

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export async function transferSect(
  api: NativeDaoyouApi,
  input: {
    targetSectId: string;
    reversePaths: boolean;
    consumableId: string;
  },
  idempotencyKey: string,
): Promise<Record<string, unknown>> {
  const result = await api.post('/api/sects/current/transfer', input, {
    'Idempotency-Key': idempotencyKey,
  });
  return asRecord(result) ?? {};
}
