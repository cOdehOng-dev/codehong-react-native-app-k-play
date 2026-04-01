import { PlaceListResponseDto } from '../model/place/placeListResponseDto';
import { PerformanceDetailProps } from './../../domain/model/apiprops/performanceDetailProps';
import {
  getPerformanceDetail,
  getPerformanceList,
  getPlaceDetail,
  searchPlace,
} from '../remote/kopisApiService';
import { PerformanceListResponseDto } from '../model/performance/list/PerformanceListResponseDto';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';
import { PerformanceDetailResponseDto } from '../model/detail/performanceDetailResponseDto';
import { SearchPlaceProps } from '../../domain/model/apiprops/searchPlaceProps';
import { PlaceDetailResponseDto } from '../model/place/placeDetailResponseDto';

export class PerformanceRemoteDataSource {
  async getPerformanceList(
    params: PerformanceListProps,
  ): Promise<PerformanceListResponseDto> {
    try {
      return await getPerformanceList(params);
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 401) throw new Error('인증 키가 유효하지 않습니다.');
      if (status === 404) throw new Error('공연 데이터를 찾을 수 없습니다.');
      throw new Error('네트워크 오류가 발생했습니다.');
    }
  }

  async getPerformanceDetail(
    props: PerformanceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PerformanceDetailResponseDto | null> {
    try {
      return await getPerformanceDetail(props);
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 401) {
        errorMessage('네트워크 오류가 발생했습니다.');
      } else if (status === 404) {
        errorMessage('네트워크 오류가 발생했습니다.');
      } else {
        errorMessage('네트워크 오류가 발생했습니다.');
      }
      return null;
    }
  }

  async searchPlace(
    props: SearchPlaceProps,
    errorMessage: (msg: string) => void,
  ): Promise<PlaceListResponseDto | null> {
    try {
      return await searchPlace(props);
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 401) {
        errorMessage('네트워크 오류가 발생했습니다.');
      } else if (status === 404) {
        errorMessage('네트워크 오류가 발생했습니다.');
      } else {
        errorMessage('네트워크 오류가 발생했습니다.');
      }
      return null;
    }
  }

  async getPlaceDetail(
    props: PerformanceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PlaceDetailResponseDto | null> {
    try {
      return await getPlaceDetail(props);
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 401) {
        errorMessage('네트워크 오류가 발생했습니다.');
      } else if (status === 404) {
        errorMessage('네트워크 오류가 발생했습니다.');
      } else {
        errorMessage('네트워크 오류가 발생했습니다.');
      }
      return null;
    }
  }
}
