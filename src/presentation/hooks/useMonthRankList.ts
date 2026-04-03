import { useCallback, useState } from 'react';
import { useDI } from '../../di/DIContext';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import { BoxofficeProps } from '../../domain/model/apiprops/BoxofficeProps';

interface State {
  result: BoxOfficeItem[];
  loading: boolean;
  error: string | null;
}

export function useMonthRankList() {
  const { boxOfficeUseCase } = useDI();
  const [state, setState] = useState<State>({
    result: [],
    loading: false,
    error: null,
  });

  const callApi = useCallback(
    async (props: BoxofficeProps) => {
      setState(s => ({ ...s, loading: true, error: null }));
      try {
        const rankList = await boxOfficeUseCase.getRankList(props);
        console.log(
          '[useRankList] 응답 데이터:',
          JSON.stringify(rankList, null, 2),
        );
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
    [boxOfficeUseCase],
  );

  return { ...state, callApi };
}
