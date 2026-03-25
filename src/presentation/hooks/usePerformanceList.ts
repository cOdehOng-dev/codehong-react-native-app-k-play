import { useCallback, useState } from 'react';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import { useDI } from '../../di/DIContext';
import { PerformanceListParams } from '../../domain/model/PerformanceListParams';

interface State {
  performanceList: PerformanceInfoItem[];
  loading: boolean;
  error: string | null;
}

export function usePerformanceList() {
  const { performanceListUseCase } = useDI();
  const [state, setState] = useState<State>({
    performanceList: [],
    loading: false,
    error: null,
  });

  const callPerformanceListApi = useCallback(
    async (params: PerformanceListParams) => {
      setState(s => ({ ...s, loading: true, error: null }));
      try {
        const performanceList = await performanceListUseCase.getPerformanceList(
          params,
        );
        console.log(
          '[usePerformanceList] 응답 데이터:',
          JSON.stringify(performanceList, null, 2),
        );
        setState({
          performanceList: performanceList,
          loading: false,
          error: null,
        });
      } catch (e) {
        console.log('[usePerformanceList] 에러:', e);
        setState({
          performanceList: [],
          loading: false,
          error: (e as Error).message,
        });
      }
    },
    [performanceListUseCase],
  );

  return { ...state, callPerformanceListApi };
}
