import { LocalPerformanceListAction } from './localPerformanceListAction';
import { LocalPerformanceListState } from './localPerformanceListState';

export const localPerformanceListReducer = (
  state: LocalPerformanceListState,
  action: LocalPerformanceListAction,
): LocalPerformanceListState => {
  switch (action.type) {
    case 'SELECTED_REGION_CODE':
      return { ...state, selectedRegionCode: action.payload };
    case 'SELECTED_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SELECTED_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_VISIBLE_CALENDAR':
      return { ...state, isVisibleCalendar: action.payload };
    case 'SET_GENRE_RANK_LIST':
      return { ...state, genreRankList: action.payload };
    case 'APPEND_GENRE_RANK_LIST':
      return {
        ...state,
        genreRankList: state.genreRankList.concat(action.payload),
      };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_INITIAL_INIT':
      return { ...state, isInitialInit: action.payload };
    case 'SET_LOAD_MORE':
      return { ...state, isLoadMore: action.payload };
    case 'NO_MORE_DATA':
      return { ...state, noMoreData: action.payload };
    default:
      return state;
  }
};
