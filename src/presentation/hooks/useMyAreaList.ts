import { useQuery } from '@tanstack/react-query';
import { useDI } from '../../di/DIContext';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';

type Props = {
  props: PerformanceListProps;
};

export const useMyAreaList = ({ props }: Props) => {
  const { performanceUseCase } = useDI();

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['myAreaList', props.signGuCode],
    queryFn: () => performanceUseCase.getPerformanceList(props),
    staleTime: 1000 * 60 * 5,
  });

  return {
    result: data ?? [],
    loading: isFetching,
    error: error ? (error as Error).message : null,
    refetch,
  };
};
