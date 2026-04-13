import dayjs from 'dayjs';

export const DateUtil = {
  getToday(pattern: string): string {
    return dayjs().format(pattern);
  },

  getCurrentMonthLastDay(pattern: string): string {
    return dayjs().endOf('month').format(pattern);
  },

  getOneMonthLater(pattern: string): string {
    return dayjs().add(1, 'month').format(pattern);
  },

  getDefaultDateRange(): { startDate: string; endDate: string } {
    const start = dayjs();
    const end = dayjs().add(1, 'month');
    return {
      startDate: start.format('YYYYMMDD'),
      endDate: end.format('YYYYMMDD'),
    };
  },

  getPreviousMonthFirstDay(pattern: string): string {
    return dayjs().subtract(1, 'month').startOf('month').format(pattern);
  },

  getPreviousMonthLastDay(pattern: string): string {
    return dayjs().subtract(1, 'month').endOf('month').format(pattern);
  },

  getCurrentYearLastDay(): string {
    return dayjs().endOf('year').format('YYYYMMDD');
  },

  getCurrentMonth(isTwoDigits: boolean): string {
    const now = new Date();
    const month = now.getMonth() + 1; // 0-indexed이므로 +1
    if (isTwoDigits) {
      return month < 10 ? `0${month}` : `${month}`;
    }
    return `${month}`;
  },

  getCurrentMonthRange(): {
    startDate: string;
    endDate: string;
  } {
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
  },
};
