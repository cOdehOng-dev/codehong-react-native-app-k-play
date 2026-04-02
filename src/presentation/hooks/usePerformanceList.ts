import { useCallback, useState } from 'react';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import { useDI } from '../../di/DIContext';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';

interface State {
  result: PerformanceInfoItem[];
  loading: boolean;
  error: string | null;
}

export function usePerformanceList() {
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
        const performanceList = await performanceUseCase.getPerformanceList(
          params,
        );
        console.log(
          '[usePerformanceList] 응답 데이터:',
          JSON.stringify(performanceList, null, 2),
        );
        setState({
          result: performanceList,
          loading: false,
          error: null,
        });
      } catch (e) {
        console.log('[usePerformanceList] 에러:', e);
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
