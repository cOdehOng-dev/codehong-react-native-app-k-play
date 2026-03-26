import { PerformanceListParams } from '../model/apiparams/PerformanceListParams';
import { PerformanceInfoItem } from '../model/PerformanceInfoItem';

export interface IPerformanceUseCase {
  getPerformanceList(params: PerformanceListParams): Promise<PerformanceInfoItem[]>;
}
