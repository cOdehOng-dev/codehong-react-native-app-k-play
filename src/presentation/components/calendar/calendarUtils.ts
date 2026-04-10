export const CalendarUtils = {
  toPastColorHex: (colorHex: string): string => {
    const hex = colorHex.replace('#', '');
    if (hex.length === 8) return `#75${hex.slice(2)}`;
    if (hex.length === 6) return `#75${hex}`;
    return '#75FF322E';
  },

  parseCalendarDate: (str: string): Date => {
    const y = parseInt(str.slice(0, 4), 10);
    const m = parseInt(str.slice(4, 6), 10) - 1;
    const d = parseInt(str.slice(6, 8), 10);
    const date = new Date(y, m, d);
    date.setHours(0, 0, 0, 0);
    return date;
  },

  dateToYMD: (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
  },

  isPast: (compareDate: Date, todayDate: Date): boolean => {
    return (
      compareDate.getFullYear() < todayDate.getFullYear() ||
      (compareDate.getFullYear() === todayDate.getFullYear() &&
        (compareDate.getMonth() < todayDate.getMonth() ||
          (compareDate.getMonth() === todayDate.getMonth() &&
            compareDate.getDate() < todayDate.getDate())))
    );
  },

  isSameDay: (a: Date, b: Date): boolean => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  },

  formatYearMonth: (date: Date, pattern: string): string => {
    const y = date.getFullYear().toString();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    return pattern.replace('yyyy', y).replace('MM', m);
  },

  generateMonthDays: (month: Date): (Date | null)[] => {
    const y = month.getFullYear();
    const mo = month.getMonth();
    const daysInMonth = new Date(y, mo + 1, 0).getDate();
    const firstDow = new Date(y, mo, 1).getDay();
    const days: (Date | null)[] = Array(firstDow).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(y, mo, d);
      date.setHours(0, 0, 0, 0);
      days.push(date);
    }
    while (days.length % 7 !== 0) days.push(null);
    return days;
  },
};
