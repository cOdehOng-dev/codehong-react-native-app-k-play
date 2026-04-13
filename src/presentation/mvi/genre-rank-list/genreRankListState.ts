import { GenreCodeItem } from '../../../domain/type/genreCode';
import { RegionCode } from '../../../domain/type/regionCode';
import { DateUtil } from '../../../domain/util/dateUtil';

export type GenreRankListState = {
  genreCode: GenreCodeItem | null;
  selectedRegionCode: RegionCode;
  startDate: string;
  endDate: string;
  isVisibleCalendar: boolean;
};

export const initialGenreRankListState: GenreRankListState = {
  genreCode: null,
  selectedRegionCode: RegionCode.SEOUL,
  startDate: DateUtil.getToday('YYYYMMDD'),
  endDate: DateUtil.getOneMonthLater('YYYYMMDD'),
  isVisibleCalendar: false,
};
