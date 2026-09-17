/** 判断 notice 是否应常驻（错误/门禁），不自动消失 */
export function isPersistentNotice(text: string): boolean {
  if (!text.trim()) return false;
  return /失败|错误|不足|缺少|尚未|请先|请输入|请选择|不能|不可|无法|无效|用尽|已尽|未授权|暂未|不支持|不通|没有可选|至少需要|最多选择|过长|超出|不符合|冲突/.test(text);
}

/** 判断 notice 是否为进行态，由 busy 或后续结果覆盖 */
export function isTransientLoadingNotice(text: string): boolean {
  if (!text.trim()) return false;
  return /正在|处理中|载入|登录|汇聚|验证|读取天机/.test(text);
}

export function noticeAutoDismissMs(text: string): number | null {
  if (!text.trim()) return null;
  if (isPersistentNotice(text) || isTransientLoadingNotice(text)) return null;
  return 2800;
}
