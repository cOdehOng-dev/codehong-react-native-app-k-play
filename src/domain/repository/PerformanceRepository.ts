import { PerformanceInfoItem } from '../model/PerformanceInfoItem';
import { PerformanceListParams } from '../model/apiprops/PerformanceListParams';
import { PerformanceDetailProps } from '../model/apiprops/performanceDetailProps';
import { PerformanceDetail } from '../model/detail/performanceDetail';

export interface PerformanceRepository {
  getPerformanceList(
    params: PerformanceListParams,
  ): Promise<PerformanceInfoItem[]>;

  getDetail(
    props: PerformanceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PerformanceDetail | null>;
}
