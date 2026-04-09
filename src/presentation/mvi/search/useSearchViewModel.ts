import { KOKOR_CLIENT_ID } from '@env';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
  getCurrentYearLastDay,
  getPreviousMonthFirstDay,
} from '../../../domain/util/dateUtil';
import { useRecentKeyword } from '../../hooks/useRecentKeyword';
import { useSearch } from '../../hooks/useSearch';
import { SearchAction } from './searchAction';
import { searchReducer } from './searchReducer';
import { initialSearchState } from './searchState';

export const useSearchViewModel = () => {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  const onAction = useCallback((action: SearchAction) => {
    dispatch(action);
    if (action.type === 'SET_KEYWORD' && action.payload.trim().length > 0) {
      save(action.payload);
    }
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
    dispatch({ type: 'SET_LOADING', payload: isSearchResultListLoading });
  }, [isSearchResultListLoading]);

  const {
    recentKeywordList,
    saveRecentKeyword,
    removeRecentKeyword,
    clearAllRecentKeywordList,
  } = useRecentKeyword();

  useEffect(() => {
    onAction({ type: 'SET_KEYWORD_LIST', payload: recentKeywordList });
  }, [recentKeywordList, onAction]);

  const save = useCallback(
    async (keyword: string) => {
      await saveRecentKeyword(keyword);
    },
    [saveRecentKeyword],
  );

  const remove = useCallback(
    (keyword: string) => {
      removeRecentKeyword(keyword);
    },
    [removeRecentKeyword],
  );

  const clearAllRecentKeyword = useCallback(() => {
    clearAllRecentKeywordList();
  }, [clearAllRecentKeywordList]);

  const isEmptyInputKeyword = state.inputKeyword.length === 0;
  const hasRecentKeyword = state.recentKeywordList.length > 0;

  return {
    state,
    onAction,
    searchResultList,
    isSearchResultListLoading,
    isEmptyInputKeyword,
    hasRecentKeyword,
    save,
    remove,
    clearAllRecentKeyword,
  };
};
