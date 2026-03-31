import { useCallback, useState } from 'react';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import { useDI } from '../../di/DIContext';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';

interface State {
  performanceList: PerformanceInfoItem[];
  loading: boolean;
  error: string | null;
}

export function usePerformanceList() {
  const { performanceUseCase } = useDI();
  const [state, setState] = useState<State>({
    performanceList: [],
    loading: false,
    error: null,
  });

  const callPerformanceListApi = useCallback(
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
    [performanceUseCase],
  );

  return { ...state, callPerformanceListApi };
}
