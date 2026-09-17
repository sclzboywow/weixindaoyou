export function wrapNativeMailLines(
  content: string,
  columns: number,
  maxLines = Number.POSITIVE_INFINITY,
): string[] {
  const safeColumns = Math.max(4, Math.floor(columns));
  const lines = String(content ?? '')
    .split(/\r\n?|\n/)
    .flatMap((paragraph) => {
      const chars = Array.from(paragraph.trim());
      if (!chars.length) return [''];
      const rows: string[] = [];
      for (let index = 0; index < chars.length; index += safeColumns) {
        rows.push(chars.slice(index, index + safeColumns).join(''));
      }
      return rows;
    });

  const visible = lines.slice(0, Math.max(1, Math.floor(maxLines)));
  if (lines.length > visible.length) {
    const lastIndex = visible.length - 1;
    const last = Array.from(visible[lastIndex] ?? '');
    visible[lastIndex] = `${last.slice(0, Math.max(0, safeColumns - 1)).join('')}…`;
  }
  return visible.length ? visible : [''];
}
