import { PerformanceInfoItem } from '../model/PerformanceInfoItem';
import { PerformanceListParams } from '../model/PerformanceListParams';

export interface PerformanceRepository {
  getPerformanceList(params: PerformanceListParams): Promise<PerformanceInfoItem[]>;
}
