import { describe, expect, it } from 'vitest';

import {
  isPersistentNotice,
  isTransientLoadingNotice,
  noticeAutoDismissMs,
} from './noticeFeedback';

describe('noticeFeedback', () => {
  it.each([
    '请输入兑换码',
    '请选择目标槽位以确定法宝类型。',
    '今日挑战次数已尽',
    '不可挑战自己',
    '此路不通',
    '反馈内容至少需要 10 个字',
  ])('keeps actionable errors visible: %s', (text) => {
    expect(isPersistentNotice(text)).toBe(true);
    expect(noticeAutoDismissMs(text)).toBeNull();
  });

  it.each([
    '洞府积蓄已收取',
    '物品已寄售上架',
    '本次丹方未留存',
    '没有未读玉简',
  ])('dismisses successful or neutral outcomes: %s', (text) => {
    expect(isPersistentNotice(text)).toBe(false);
    expect(noticeAutoDismissMs(text)).toBe(2800);
  });

  it('leaves loading feedback to the busy lifecycle', () => {
    expect(isTransientLoadingNotice('正在读取天机…')).toBe(true);
    expect(noticeAutoDismissMs('正在读取天机…')).toBeNull();
  });
});
