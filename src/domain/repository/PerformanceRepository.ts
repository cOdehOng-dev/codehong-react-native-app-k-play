import { PerformanceInfoItem } from '../model/PerformanceInfoItem';
import { PerformanceListParams } from '../model/apiparams/PerformanceListParams';

export interface PerformanceRepository {
  getPerformanceList(
    params: PerformanceListParams,
  ): Promise<PerformanceInfoItem[]>;
}
