import { PerformanceDetailProps } from '../model/apiprops/performanceDetailProps';
import { PerformanceListParams } from '../model/apiprops/PerformanceListParams';
import { PerformanceDetail } from '../model/detail/performanceDetail';
import { PerformanceInfoItem } from '../model/PerformanceInfoItem';
import { PerformanceRepository } from '../repository/PerformanceRepository';

export class PerformanceUseCase {
  constructor(private readonly repository: PerformanceRepository) {}

  async getPerformanceList(
    params: PerformanceListParams,
  ): Promise<PerformanceInfoItem[]> {
    return this.repository.getPerformanceList(params);
  }

  async getDetail(
    props: PerformanceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PerformanceDetail | null> {
    return this.repository.getDetail(props, errorMessage);
  }
}
