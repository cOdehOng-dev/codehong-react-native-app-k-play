import { PerformanceInfoItem } from '../model/PerformanceInfoItem';
import { PerformanceListProps } from '../model/apiprops/performanceListProps';
import { PerformanceDetailProps } from '../model/apiprops/performanceDetailProps';
import { PerformanceDetail } from '../model/detail/performanceDetail';

export interface PerformanceRepository {
  getPerformanceList(
    params: PerformanceListProps,
  ): Promise<PerformanceInfoItem[]>;

  getDetail(
    props: PerformanceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PerformanceDetail | null>;
}
