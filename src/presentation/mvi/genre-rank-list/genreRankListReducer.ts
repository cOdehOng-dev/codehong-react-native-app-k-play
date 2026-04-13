import { GenreRankListAction } from './genreRankListAction';
import { GenreRankListState } from './genreRankListState';

export const genreRankListReducer = (
  state: GenreRankListState,
  action: GenreRankListAction,
): GenreRankListState => {
  switch (action.type) {
    case 'GENRE_CODE':
      return { ...state, genreCode: action.payload };
    case 'SELECTED_REGION_CODE':
      return { ...state, selectedRegionCode: action.payload };
    case 'SELECTED_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SELECTED_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_VISIBLE_CALENDAR':
      return { ...state, isVisibleCalendar: action.payload };
    default:
      return state;
  }
};
