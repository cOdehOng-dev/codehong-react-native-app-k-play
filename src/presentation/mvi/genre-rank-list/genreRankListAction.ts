import { GenreCodeItem } from '../../../domain/type/genreCode';
import { RegionCode } from '../../../domain/type/regionCode';
import { PerformanceInfoItem } from '../../../domain/model/performanceInfoItem';

export type GenreRankListAction =
  | {
      type: 'GENRE_CODE';
      payload: GenreCodeItem;
    }
  | { type: 'SELECTED_REGION_CODE'; payload: RegionCode }
  | { type: 'SELECTED_START_DATE'; payload: string }
  | { type: 'SELECTED_END_DATE'; payload: string }
  | { type: 'SET_VISIBLE_CALENDAR'; payload: boolean }
  | { type: 'SET_GENRE_RANK_LIST'; payload: PerformanceInfoItem[] }
  | { type: 'APPEND_GENRE_RANK_LIST'; payload: PerformanceInfoItem[] }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_INITIAL_INIT'; payload: boolean }
  | { type: 'SET_LOAD_MORE'; payload: boolean }
  | { type: 'NO_MORE_DATA'; payload: boolean };
