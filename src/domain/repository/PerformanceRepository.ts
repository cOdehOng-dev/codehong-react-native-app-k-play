import { PerformanceInfoItem } from '../model/PerformanceInfoItem';
import { PerformanceListParams } from './../../data/remote/KopisApiService';
export interface PerformanceRepository {
  getPerformanceList(
    params: PerformanceListParams,
  ): Promise<PerformanceInfoItem[]>;
}
