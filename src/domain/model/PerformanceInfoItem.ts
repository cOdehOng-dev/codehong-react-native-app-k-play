export interface PerformanceInfoItem {
  id?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  placeName?: string;
  posterUrl?: string;
  area?: string;
  genre?: string;
  openRun?: string;
  state?: string;
  awards?: string;
  latitude?: number;
  longitude?: number;
}

export function getPeriod(item: PerformanceInfoItem): string {
  const parts: string[] = [];
  if (item.startDate) parts.push(item.startDate);
  if (item.startDate && item.endDate) parts.push('~');
  if (item.endDate) parts.push(item.endDate);
  return parts.join(' ');
}
