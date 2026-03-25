export function extractParenthesesContent(
  str: string | null | undefined,
): string {
  if (!str) return '';
  const startIndex = str.indexOf('(');
  const endIndex = str.indexOf(')');
  if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    return str.substring(startIndex + 1, endIndex);
  }
  return str;
}

export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
