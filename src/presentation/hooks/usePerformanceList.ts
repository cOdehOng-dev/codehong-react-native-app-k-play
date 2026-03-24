import { useCallback, useState } from 'react';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import { useDI } from '../di/DIContext';
import { PerformanceListParams } from '../../data/remote/KopisApiService';

interface State {
  performances: PerformanceInfoItem[];
  loading: boolean;
  error: string | null;
}

export const usePerformanceList = () => {
  const { performanceListUseCase } = useDI();
  const [state, setState] = useState<State>({
    performances: [],
    loading: false,
    error: null,
  });

  const fetch = useCallback(
    async (params: PerformanceListParams) => {
      setState(s => ({ ...s, loading: true, error: null }));
      try {
        const performances = await performanceListUseCase.getPerformanceList(
          params,
        );
        console.log('[usePerformanceList] 응답 데이터:', JSON.stringify(performances, null, 2));
        setState({ performances, loading: false, error: null });
      } catch (e) {
        setState({
          performances: [],
          loading: false,
          error: (e as Error).message,
        });
      }
    },
    [performanceListUseCase],
  );

  return { ...state, fetch };
};
