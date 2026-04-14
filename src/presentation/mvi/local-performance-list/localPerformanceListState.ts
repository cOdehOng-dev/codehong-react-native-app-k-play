import { GenreCodeItem } from '../../../domain/type/genreCode';
import { RegionCode } from '../../../domain/type/regionCode';
import { DateUtil } from '../../../domain/util/dateUtil';
import { PerformanceInfoItem } from '../../../domain/model/performanceInfoItem';

export type LocalPerformanceListState = {
  selectedRegionCode: RegionCode;
  startDate: string;
  endDate: string;
  isVisibleCalendar: boolean;
  genreRankList: PerformanceInfoItem[];
  currentPage: number;
  isInitialInit: boolean;
  isLoadMore: boolean;
  noMoreData: boolean;
};

export const initialLocalPerformanceListState: LocalPerformanceListState = {
  selectedRegionCode: RegionCode.SEOUL,
  startDate: DateUtil.getToday('YYYYMMDD'),
  endDate: DateUtil.getOneMonthLater('YYYYMMDD'),
  isVisibleCalendar: false,
  genreRankList: [],
  currentPage: 1,
  isInitialInit: true,
  isLoadMore: false,
  noMoreData: false,
};
