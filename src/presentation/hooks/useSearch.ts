import { useQuery } from '@tanstack/react-query';
import { useDI } from '../../di/DIContext';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';

type Props = {
  props: PerformanceListProps;
};

export const useSearch = ({ props }: Props) => {
  const { performanceUseCase } = useDI();
  const { data, isLoading, error } = useQuery({
    queryKey: ['search', props.keyword],
    queryFn: () => performanceUseCase.getPerformanceList(props),
  });

  if (!props.keyword || props.keyword.length === 0)
    return { result: [], loading: false, error: null };
  return {
    result: data ?? [],
    loading: isLoading,
    error: error ? (error as Error).message : null,
  };
};
