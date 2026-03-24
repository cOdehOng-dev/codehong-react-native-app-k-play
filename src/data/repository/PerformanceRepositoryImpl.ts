import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import { PerformanceRemoteDataSource } from '../datasource/PerformanceRemoteDataSource';
import { asDomain } from '../mapper/PerformanceInfoMapper';
import { PerformanceListParams } from '../remote/KopisApiService';
import { PerformanceRepository } from './../../domain/repository/PerformanceRepository';
export class PerformanceRepositoryImpl implements PerformanceRepository {
  constructor(private readonly remoteDataSource: PerformanceRemoteDataSource) {}

  async getPerformanceList(
    params: PerformanceListParams,
  ): Promise<PerformanceInfoItem[]> {
    const dto = await this.remoteDataSource.getPerformanceList(params);
    return dto.performances?.map(item => asDomain(item)) ?? [];
  }
}
