import { useCallback, useReducer } from 'react';
import { genreRankListReducer } from './genreRankListReducer';
import { initialGenreRankListState } from './genreRankListState';
import { GenreRankListAction } from './genreRankListAction';
import { genreCodeList } from '../../../domain/type/genreCode';
import { regionCodeList } from '../../../domain/type/regionCode';

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
      dispatch({ type: 'GENRE_CODE', payload: genreCode });
    }
  }, []);

  const setSelectedRegionCode = useCallback((code: string) => {
    const regionCode = regionCodeList.find(item => item.code === code);
    if (regionCode) {
      dispatch({ type: 'SELECTED_REGION_CODE', payload: regionCode });
    }
  }, []);

  return { state, onAction, setGenreCodeItem, setSelectedRegionCode };
};
