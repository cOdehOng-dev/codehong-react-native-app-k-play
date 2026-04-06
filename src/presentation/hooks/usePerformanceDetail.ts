import { useQuery } from '@tanstack/react-query';
import { useDI } from '../../di/DIContext';
import { PerformanceDetailProps } from '../../domain/model/apiprops/performanceDetailProps';

type Props = {
  props: PerformanceDetailProps;
};

export const usePerformanceDetail = ({ props }: Props) => {
  const { performanceUseCase } = useDI();

  const { data, isLoading, error } = useQuery({
    queryKey: ['performanceDetail', props.id],
    queryFn: () =>
      performanceUseCase.getDetail(props, msg =>
        console.log('[usePerformanceDetail] API 에러:', msg),
      ),
    staleTime: 0,
  });

  return {
    result: data ?? null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
  };
};
