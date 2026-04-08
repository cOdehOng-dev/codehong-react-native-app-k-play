import { KOKOR_CLIENT_ID } from '@env';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
  getCurrentYearLastDay,
  getPreviousMonthFirstDay,
} from '../../../domain/util/dateUtil';
import { useSearch } from '../../hooks/useSearch';
import { SearchAction } from './searchAction';
import { searchReducer } from './searchReducer';
import { initialSearchState } from './searchState';

export const useSearchViewModel = () => {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  const onAction = useCallback((action: SearchAction) => {
    dispatch(action);
  }, []);

  const searchProps = useMemo(() => {
    return {
      service: KOKOR_CLIENT_ID,
      startDate: getPreviousMonthFirstDay('YYYYMMDD'),
      endDate: getCurrentYearLastDay(),
      currentPage: '1',
      rowsPerPage: '20',
      keyword: state.keyword,
    };
  }, [state.keyword]);

  const { result: searchResultList, loading: isSearchResultListLoading } =
    useSearch({ props: searchProps });

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', loading: isSearchResultListLoading });
  }, [isSearchResultListLoading]);

  return {
    state,
    onAction,
    searchResultList,
    isSearchResultListLoading,
  };
};
