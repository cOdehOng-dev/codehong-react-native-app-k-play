import { PerformanceListParams } from '../../data/remote/KopisApiService';
import { PerformanceInfoItem } from '../model/PerformanceInfoItem';
import { PerformanceRepository } from '../repository/PerformanceRepository';

export class PerformanceUseCase {
  constructor(private readonly repository: PerformanceRepository) {}

  async getPerformanceList(
    params: PerformanceListParams,
  ): Promise<PerformanceInfoItem[]> {
    return this.repository.getPerformanceList(params);
  }
}
