import { useQuery } from '@tanstack/react-query';
import { useDI } from '../../di/DIContext';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';
import { toRegionCode } from '../../domain/type/regionCode';

type Props = {
  props: PerformanceListProps;
};

export const useLocalList = ({ props }: Props) => {
  const { performanceUseCase } = useDI();
  const code = toRegionCode(props.signGuCode);

  const { data, isFetching, error } = useQuery({
    queryKey: ['localList', code],
    queryFn: () => performanceUseCase.getPerformanceList(props),
    staleTime: 1000 * 60 * 5,
  });

  return {
    result: data ?? [],
    loading: isFetching,
    error: error ? (error as Error).message : null,
  };
};
