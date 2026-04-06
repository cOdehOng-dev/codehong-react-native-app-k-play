import { PerformanceInfoItem } from '../model/PerformanceInfoItem';
import { PerformanceListProps } from '../model/apiprops/performanceListProps';
import { PerformanceDetailProps } from '../model/apiprops/performanceDetailProps';
import { PerformanceDetail } from '../model/detail/performanceDetail';
import { PlaceDetailProps } from '../model/apiprops/placeDetailProps';
import { PlaceDetail } from '../model/place/placeDetail';

export interface PerformanceRepository {
  getPerformanceList(
    props: PerformanceListProps,
  ): Promise<PerformanceInfoItem[]>;

  getFestivalList(
    props: PerformanceListProps,
    errorMessage: (msg: string) => void,
  ): Promise<PerformanceInfoItem[]>;

  getDetail(
    props: PerformanceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PerformanceDetail | null>;

  searchPlace(
    props: PlaceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PlaceDetail[] | null>;

  getPlaceDetail(
    props: PerformanceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PlaceDetail | null>;
}
