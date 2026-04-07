import { PerformanceInfoItem } from './PerformanceInfoItem';

export interface PerformanceGroup {
  placeName?: string | null;
  lat?: number | null;
  lng?: number | null;
  performanceList?: PerformanceInfoItem[];
}
