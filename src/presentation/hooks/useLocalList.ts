import { useQuery } from '@tanstack/react-query';
import { useDI } from '../../di/DIContext';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';
import { toRegionCode } from '../../domain/type/regionCode';

type Props = {
  props: PerformanceListProps;
  enabled?: boolean;
};

export const useLocalList = ({ props, enabled = true }: Props) => {
  const { performanceUseCase } = useDI();
  const code = toRegionCode(props.signGuCode);

  const { data, isFetching, error } = useQuery({
    queryKey: [
      'localList',
      code,
      props.currentPage,
      props.genreCode,
      props.startDate,
      props.endDate,
    ],
    queryFn: () => performanceUseCase.getPerformanceList(props),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

  return {
    result: data ?? [],
    loading: isFetching,
    error: error ? (error as Error).message : null,
  };
};
