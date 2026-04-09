import { PerformanceInfoItem } from '../../domain/model/performanceInfoItem';
import { PerformanceRemoteDataSource } from '../datasource/remote/performanceRemoteDataSource';
import {
  toPerformanceDetail,
  toPerformanceItem,
} from '../mapper/PerformanceInfoMapper';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';
import { PerformanceRepository } from './../../domain/repository/PerformanceRepository';
import { PerformanceDetailProps } from '../../domain/model/apiprops/performanceDetailProps';
import { PerformanceDetail } from '../../domain/model/detail/performanceDetail';
import { PlaceDetailProps } from '../../domain/model/apiprops/placeDetailProps';
import { PlaceDetail } from '../../domain/model/place/placeDetail';
import { placeInfoItemtoPlaceDetail } from '../mapper/placeInfoItemMapper';
import { placeDetailDtoToPlaceDetail } from '../mapper/placeDetailMapper';

export class PerformanceRepositoryImpl implements PerformanceRepository {
  constructor(private readonly remote: PerformanceRemoteDataSource) {}

  async getPerformanceList(
    props: PerformanceListProps,
  ): Promise<PerformanceInfoItem[]> {
    const dto = await this.remote.getPerformanceList(props);
    return dto.performances?.map(item => toPerformanceItem(item)) ?? [];
  }

  async getFestivalList(
    props: PerformanceListProps,
    errorMessage: (msg: string) => void,
  ): Promise<PerformanceInfoItem[]> {
    const dto = await this.remote.getFestivalList(props, errorMessage);
    if (!dto) return [];
    return dto.performances?.map(item => toPerformanceItem(item)) ?? [];
  }

  async getDetail(
    props: PerformanceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PerformanceDetail | null> {
    const dto = await this.remote.getPerformanceDetail(props, errorMessage);
    if (!dto) return null;
    return toPerformanceDetail(dto.detail);
  }

  async searchPlace(
    props: PlaceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PlaceDetail[] | null> {
    console.log('[RepositoryImpl] searchPlace 시작');
    const dto = await this.remote.searchPlace(props, errorMessage);
    console.log('[RepositoryImpl] searchPlace dto:', JSON.stringify(dto));
    if (!dto) return null;
    return dto.facilities?.map(item => placeInfoItemtoPlaceDetail(item)) ?? [];
  }

  async getPlaceDetail(
    props: PerformanceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PlaceDetail | null> {
    console.log('[RepositoryImpl] getPlaceDetail 시작, id:', props.id);
    const dto = await this.remote.getPlaceDetail(props, errorMessage);
    console.log('[RepositoryImpl] getPlaceDetail dto:', JSON.stringify(dto));
    if (!dto) return null;
    console.log(
      '[RepositoryImpl] placeDetailDtoToPlaceDetail 타입:',
      typeof placeDetailDtoToPlaceDetail,
    );
    return placeDetailDtoToPlaceDetail(dto.facilities?.[0]);
  }
}
