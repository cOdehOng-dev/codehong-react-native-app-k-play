import { GenreCodeItem } from '../../../domain/type/genreCode';
import { RegionCode } from '../../../domain/type/regionCode';

export type GenreRankListAction =
  | {
      type: 'GENRE_CODE';
      payload: GenreCodeItem;
    }
  | { type: 'SELECTED_REGION_CODE'; payload: RegionCode }
  | { type: 'SELECTED_START_DATE'; payload: string }
  | { type: 'SELECTED_END_DATE'; payload: string }
  | { type: 'SET_VISIBLE_CALENDAR'; payload: boolean };
