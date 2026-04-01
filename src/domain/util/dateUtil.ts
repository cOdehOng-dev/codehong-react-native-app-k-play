import dayjs from 'dayjs';

// 현재 달의 시작일과 종료일을 'YYYYMMDD' 형식으로 반환
export const getCurrentMonthRange = (): {
  startDate: string;
  endDate: string;
} => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0); // 해당 달의 마지막 날

  const format = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
  };

  return {
    startDate: format(startDate),
    endDate: format(endDate),
  };
};

export const getCurrentMonth = (isTwoDigits: boolean) => {
  const now = new Date();
  const month = now.getMonth() + 1; // 0-indexed이므로 +1
  if (isTwoDigits) {
    return month < 10 ? `0${month}` : `${month}`;
  }
  return `${month}`;
};

export function getPreviousMonthFirstDay(pattern: string): string {
  return dayjs().subtract(1, 'month').startOf('month').format(pattern);
}

export function getPreviousMonthLastDay(pattern: string): string {
  return dayjs().subtract(1, 'month').endOf('month').format(pattern);
}
