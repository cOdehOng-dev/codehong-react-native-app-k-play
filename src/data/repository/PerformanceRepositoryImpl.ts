import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import { PerformanceRemoteDataSource } from '../datasource/performanceRemoteDataSource';
import {
  toPerformanceDetail,
  toPerformanceItem,
} from '../mapper/PerformanceInfoMapper';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';
import { PerformanceRepository } from './../../domain/repository/PerformanceRepository';
import { PerformanceDetailProps } from '../../domain/model/apiprops/performanceDetailProps';
import { PerformanceDetail } from '../../domain/model/detail/performanceDetail';
export class PerformanceRepositoryImpl implements PerformanceRepository {
  constructor(private readonly remote: PerformanceRemoteDataSource) {}

  async getPerformanceList(
    params: PerformanceListProps,
  ): Promise<PerformanceInfoItem[]> {
    const dto = await this.remote.getPerformanceList(params);
    return dto.performances?.map(item => toPerformanceItem(item)) ?? [];
  }

  async getDetail(
    props: PerformanceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PerformanceDetail | null> {
    const dto = await this.remote.getPerformanceDetail(props, errorMessage);
    console.log(`test here dto = ${JSON.stringify(dto)}`);
    if (!dto) return null;
    return toPerformanceDetail(dto.detail);
  }
}
