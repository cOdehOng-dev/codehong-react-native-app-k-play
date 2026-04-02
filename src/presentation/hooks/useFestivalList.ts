import { useCallback, useState } from 'react';
import { useDI } from '../../di/DIContext';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';

interface State {
  result: PerformanceInfoItem[];
  loading: boolean;
  error: string | null;
}

export function useFestivalList() {
  const { performanceUseCase } = useDI();
  const [state, setState] = useState<State>({
    result: [],
    loading: false,
    error: null,
  });

  const callApi = useCallback(
    async (params: PerformanceListProps) => {
      setState(s => ({ ...s, loading: true, error: null }));
      try {
        const festivalList = await performanceUseCase.getFestivalList(
          params,
          msg => console.log('[useFestivalList] API 에러:', msg),
        );
        console.log(
          '[useFestivalList] 응답 데이터:',
          JSON.stringify(festivalList, null, 2),
        );
        setState({
          result: festivalList,
          loading: false,
          error: null,
        });
      } catch (e) {
        console.log('[useFestivalList] 에러:', e);
        setState({
          result: [],
          loading: false,
          error: (e as Error).message,
        });
      }
    },
    [performanceUseCase],
  );

  return { ...state, callApi };
}
