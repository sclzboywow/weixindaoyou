import type { WxCanvas } from '../platform/wechat';
import { wrapNativeMailLines } from './nativeMailLines';

/** Mail keeps explicit paragraph breaks; long letters scroll instead of truncating. */
export function drawNativeMailBody(
  ctx: ReturnType<WxCanvas['getContext']>,
  content: string,
  rect: { x: number; y: number; width: number; height: number },
  scroll: number,
  size: number,
  draw: (text: string, x: number, y: number) => void,
): number {
  const columns = Math.max(4, Math.floor((rect.width - 24) / (size * 1.05)));
  const lines = wrapNativeMailLines(content, columns);
  const fullHeight = lines.length * 20 + 28;
  rect.height = Math.min(rect.height, Math.max(100, fullHeight));
  const max = Math.max(0, fullHeight - rect.height);
  const offset = Math.max(0, Math.min(scroll, max));
  ctx.save();
  ctx.fillStyle = 'rgba(248,243,230,.76)';
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  ctx.strokeStyle = 'rgba(44,24,16,.10)';
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(rect.x + 0.5, rect.y + 0.5, rect.width - 1, rect.height - 1);
  ctx.beginPath();
  ctx.rect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2);
  ctx.clip();
  lines.forEach((line, index) => {
    const y = rect.y + 27 + index * 20 - offset;
    if (y >= rect.y && y <= rect.y + rect.height + 20)
      draw(line, rect.x + 12, y);
  });
  if (max > 0) {
    const height = Math.max(16, (rect.height * rect.height) / fullHeight);
    ctx.fillStyle = 'rgba(90,74,66,.4)';
    ctx.fillRect(
      rect.x + rect.width - 4,
      rect.y + (offset / max) * (rect.height - height),
      3,
      height,
    );
  }
  ctx.restore();
  return max;
}
