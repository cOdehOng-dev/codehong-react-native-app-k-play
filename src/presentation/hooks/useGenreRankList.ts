import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import { useCallback, useState } from 'react';
import { useDI } from '../../di/DIContext';
import { BoxofficeProps } from '../../domain/model/apiprops/BoxofficeProps';
import { GenreCodeItem, toGenreCode } from '../../domain/type/GenreCode';

interface State {
  result: BoxOfficeItem[];
  loading: boolean;
  error: string | null;
}

interface Props {
  entireGenreRankList: Map<GenreCodeItem, BoxOfficeItem[]>;
  setEntireGenreRankList: (
    entireGenreRankList: Map<GenreCodeItem, BoxOfficeItem[]>,
  ) => void;
}

export function useGenreRankList({
  entireGenreRankList,
  setEntireGenreRankList,
}: Props) {
  const { boxOfficeUseCase } = useDI();
  const [state, setState] = useState<State>({
    result: [],
    loading: false,
    error: null,
  });

  const callApi = useCallback(
    async (props: BoxofficeProps) => {
      setState(s => ({ ...s, loading: true, error: null }));
      const code = toGenreCode(props.genreCode);
      const cachedRankList = entireGenreRankList.get(code);
      if (cachedRankList && cachedRankList.length > 0) {
        setState({
          result: cachedRankList,
          loading: false,
          error: null,
        });
        return;
      }
      try {
        const rankList = await boxOfficeUseCase.getRankList(props);
        console.log(
          '[useRankList] 응답 데이터:',
          JSON.stringify(rankList, null, 2),
        );
        const next = new Map(entireGenreRankList);
        next.set(code, rankList);
        setEntireGenreRankList(next);
        setState({
          result: rankList,
          loading: false,
          error: null,
        });
      } catch (e) {
        console.log('[useRankList] 에러:', e);
        setState({
          result: [],
          loading: false,
          error: (e as Error).message,
        });
      }
    },
    [boxOfficeUseCase, entireGenreRankList, setEntireGenreRankList],
  );

  return { ...state, callApi };
}
