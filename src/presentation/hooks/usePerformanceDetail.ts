import { useCallback, useState } from 'react';
import { useDI } from '../../di/DIContext';
import { PerformanceDetail } from '../../domain/model/detail/performanceDetail';
import { PerformanceDetailProps } from '../../domain/model/apiprops/performanceDetailProps';

interface State {
  performanceDetail: PerformanceDetail | null;
  loading: boolean;
  error: string | null;
}

export function usePerformanceDetail() {
  const { performanceUseCase } = useDI();
  const [state, setState] = useState<State>({
    performanceDetail: null,
    loading: true,
    error: null,
  });

  const callPerformanceDetailApi = useCallback(
    async (props: PerformanceDetailProps) => {
      setState(s => ({ ...s, loading: true, error: null }));
      try {
        const performanceDetail = await performanceUseCase.getDetail(
          props,
          msg => console.log('[usePerformanceDetail] API 에러:', msg),
        );
        console.log(
          '[usePerformanceDetail] 응답 데이터:',
          JSON.stringify(performanceDetail, null, 2),
        );
        setState({
          performanceDetail: performanceDetail,
          loading: false,
          error: null,
        });
      } catch (e) {
        console.log('[usePerformanceDetail] 에러:', e);
        setState({
          performanceDetail: null,
          loading: false,
          error: (e as Error).message,
        });
      }
    },
    [performanceUseCase],
  );

  return { ...state, callPerformanceDetailApi };
}
