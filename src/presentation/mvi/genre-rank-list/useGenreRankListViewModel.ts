import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { genreRankListReducer } from './genreRankListReducer';
import { initialGenreRankListState } from './genreRankListState';
import { GenreRankListAction } from './genreRankListAction';
import { genreCodeList } from '../../../domain/type/genreCode';
import { regionCodeList } from '../../../domain/type/regionCode';
import { DateUtil } from '../../../domain/util/dateUtil';
import { KOKOR_CLIENT_ID } from '@env';
import { useLocalList } from '../../hooks/useLocalList';

export const useGenreRankListViewModel = () => {
  const [state, dispatch] = useReducer(
    genreRankListReducer,
    initialGenreRankListState,
  );

  const onAction = useCallback((action: GenreRankListAction) => {
    dispatch(action);
  }, []);

  const setGenreCodeItem = useCallback((code: string) => {
    const genreCode = genreCodeList.find(item => item.code === code);
    if (genreCode) {
      dispatch({ type: 'SET_GENRE_RANK_LIST', payload: [] });
      dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
      dispatch({ type: 'SET_INITIAL_INIT', payload: true });
      dispatch({ type: 'SET_LOAD_MORE', payload: false });
      dispatch({ type: 'NO_MORE_DATA', payload: false });
      dispatch({ type: 'SET_FETCHED', payload: false });
      dispatch({ type: 'GENRE_CODE', payload: genreCode });
    }
  }, []);

  const setSelectedRegionCode = useCallback((code: string) => {
    const regionCode = regionCodeList.find(item => item.code === code);
    if (regionCode) {
      // 지역 변경 시 리스트 초기화 및 페이지 리셋
      dispatch({ type: 'SET_GENRE_RANK_LIST', payload: [] });
      dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
      dispatch({ type: 'SET_INITIAL_INIT', payload: true });
      dispatch({ type: 'SET_LOAD_MORE', payload: false });
      dispatch({ type: 'NO_MORE_DATA', payload: false });
      dispatch({ type: 'SELECTED_REGION_CODE', payload: regionCode });
    }
  }, []);

  const genreRankListProps = useMemo(
    () => ({
      service: KOKOR_CLIENT_ID,
      startDate: DateUtil.getPreviousMonthFirstDay('YYYYMMDD'),
      endDate: DateUtil.getPreviousMonthLastDay('YYYYMMDD'),
      currentPage: state.currentPage.toString(),
      rowsPerPage: '20',
      signGuCode: state.selectedRegionCode.code,
      genreCode: state.genreCode?.code,
    }),
    [state.selectedRegionCode, state.currentPage, state.genreCode],
  );

  const { result: genreRankList, loading: isLoadingGenreRankList } =
    useLocalList({
      props: genreRankListProps,
      enabled: !!genreRankListProps.genreCode,
      staleTime: 0,
    });

  useEffect(() => {
    if (genreRankList.length === 0) {
      if (state.isLoadMore) {
        dispatch({ type: 'SET_LOAD_MORE', payload: false });
        dispatch({ type: 'NO_MORE_DATA', payload: true });
      }
      if (state.isInitialInit) {
        dispatch({ type: 'SET_INITIAL_INIT', payload: false });
        // 초기 로드 후 API가 빈 배열 반환 → 결과 없음으로 확정
        dispatch({ type: 'SET_FETCHED', payload: true });
      }
      return;
    }
    // API에서 데이터가 왔을 때만 isFetched: true
    dispatch({ type: 'SET_FETCHED', payload: true });
    if (state.isInitialInit) {
      dispatch({ type: 'SET_INITIAL_INIT', payload: false });
    }
    if (state.isLoadMore) {
      dispatch({ type: 'SET_LOAD_MORE', payload: false });
    }
    dispatch({ type: 'APPEND_GENRE_RANK_LIST', payload: genreRankList });
  }, [genreRankList]);

  const loadMore = useCallback(() => {
    if (
      isLoadingGenreRankList ||
      state.noMoreData ||
      state.genreRankList.length === 0
    ) {
      return;
    }
    dispatch({ type: 'SET_LOAD_MORE', payload: true });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage + 1 });
  }, [isLoadingGenreRankList, state.currentPage, state.genreRankList.length]);

  return {
    state,
    isLoadingGenreRankList,
    onAction,
    setGenreCodeItem,
    setSelectedRegionCode,
    loadMore,
  };
};
