import { PerformanceInfoItem } from './performanceInfoItem';

export interface PerformanceGroup {
  placeName?: string | null;
  lat?: number | null;
  lng?: number | null;
  performanceList?: PerformanceInfoItem[];
}
