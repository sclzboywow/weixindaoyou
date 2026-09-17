import {
  QI_DAILY_RESTORE_ITEM_LIMIT,
  QI_MAX,
  QI_NATURAL_RESTORE_PER_HOUR,
  QI_OVERFLOW_MAX,
} from '../../shared/config/qiSystem';

export type NativeHudInfoKind = 'realm' | 'qi';

export function buildNativeHudInfo(
  kind: NativeHudInfoKind,
  value: Record<string, string | number>,
): { title: string; lines: string[] } {
  switch (kind) {
    case 'realm':
      return {
        title: '境界',
        lines: [
          '境界代表当前道途层级，由大境界与小阶段共同组成。',
          `当前境界：${value.current}`,
          '提升方式：在静室积累修为并尝试突破。',
          '突破大境界通常还需完成破境卷宗。',
        ],
      };
    case 'qi':
      return {
        title: '🍃 天地灵气',
        lines: [
          '进入秘境、闭关修行、突破与造物时需要消耗一定的天地灵气。',
          `当前天地灵气：${value.current}/${QI_MAX}`,
          `每小时自然恢复 ${QI_NATURAL_RESTORE_PER_HOUR} 点，最高自然恢复到 ${QI_MAX}。`,
          `恢复符箓可临时溢出到 ${QI_OVERFLOW_MAX}，每日最多使用 ${QI_DAILY_RESTORE_ITEM_LIMIT} 次。`,
        ],
      };
  }
}
