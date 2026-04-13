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

export function splitAndParseWithParentheses(
  str?: string | null,
): [string, string][] {
  if (!str) return [];

  const result: [string, string][] = [];
  let buffer = '';
  let depth = 0;

  const addBufferToResult = () => {
    if (!buffer.trim()) return;

    const rawItem = buffer.trim();
    const firstParenIndex = rawItem.indexOf('(');
    const lastParenIndex = rawItem.lastIndexOf(')');

    if (firstParenIndex !== -1 && lastParenIndex > firstParenIndex) {
      const outerText = rawItem.slice(0, firstParenIndex).trim();
      const innerText = rawItem
        .slice(firstParenIndex + 1, lastParenIndex)
        .trim();
      result.push([outerText, innerText]);
    } else {
      result.push([rawItem, '']);
    }
    buffer = '';
  };

  for (const char of str) {
    if (char === '(') {
      depth++;
      buffer += char;
    } else if (char === ')') {
      if (depth > 0) depth--;
      buffer += char;
    } else if (char === ',') {
      if (depth === 0) {
        addBufferToResult();
      } else {
        buffer += char;
      }
    } else {
      buffer += char;
    }
  }

  addBufferToResult();

  return result;
}

export function toPeriod(start?: string | null, end?: string | null): string {
  if (start && end) return `${start} ~ ${end}`;
  if (start && !end) return `${start} ~ `;
  if (!start && end) return ` ~ ${end}`;
  return '';
}

export function toShortAreaName(area?: string): string | undefined {
  if (!area) return area;
  if (area.includes('서울')) return '서울';
  if (area.includes('부산')) return '부산';
  if (area.includes('대구')) return '대구';
  if (area.includes('인천')) return '인천';
  if (area.includes('광주')) return '광주';
  if (area.includes('대전')) return '대전';
  if (area.includes('울산')) return '울산';
  if (area.includes('세종')) return '세종';
  if (area.includes('경기')) return '경기';
  if (area.includes('강원')) return '강원';
  if (area.includes('충북') || area.includes('충청북')) return '충북';
  if (area.includes('충남') || area.includes('충청남')) return '충남';
  if (area.includes('전북') || area.includes('전라북')) return '전북';
  if (area.includes('전남') || area.includes('전라남')) return '전남';
  if (area.includes('경북') || area.includes('경상북')) return '경북';
  if (area.includes('경남') || area.includes('경상남')) return '경남';
  if (area.includes('제주')) return '제주';
  return area;
}
