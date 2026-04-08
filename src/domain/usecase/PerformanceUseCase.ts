import { PerformanceDetailProps } from '../model/apiprops/performanceDetailProps';
import { PerformanceListProps } from '../model/apiprops/performanceListProps';
import { PerformanceDetail } from '../model/detail/performanceDetail';
import { PerformanceInfoItem } from '../model/performanceInfoItem';
import { PerformanceRepository } from '../repository/PerformanceRepository';

export class PerformanceUseCase {
  constructor(private readonly repository: PerformanceRepository) {}

  async getPerformanceList(
    props: PerformanceListProps,
  ): Promise<PerformanceInfoItem[]> {
    return this.repository.getPerformanceList(props);
  }

  async getFestivalList(
    props: PerformanceListProps,
    errorMessage: (msg: string) => void,
  ): Promise<PerformanceInfoItem[]> {
    return this.repository.getFestivalList(props, errorMessage);
  }

  async getDetail(
    props: PerformanceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PerformanceDetail | null> {
    return this.repository.getDetail(props, errorMessage);
  }
}
