import { PerformanceListParams } from '../model/apiparams/PerformanceListParams';
import { PerformanceInfoItem } from '../model/PerformanceInfoItem';
import { PerformanceRepository } from '../repository/PerformanceRepository';
import { IPerformanceUseCase } from './IPerformanceUseCase';

export class PerformanceUseCase implements IPerformanceUseCase {
  constructor(private readonly repository: PerformanceRepository) {}

  async getPerformanceList(
    params: PerformanceListParams,
  ): Promise<PerformanceInfoItem[]> {
    return this.repository.getPerformanceList(params);
  }
}
