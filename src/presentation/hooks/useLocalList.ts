import { useQuery } from '@tanstack/react-query';
import { useDI } from '../../di/DIContext';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';
import { PerformanceInfoItem } from '../../domain/model/performanceInfoItem';
import { toRegionCode } from '../../domain/type/regionCode';

type Props = {
  props: PerformanceListProps;
  enabled?: boolean;
  staleTime?: number;
};

// data가 undefined일 때 매 렌더마다 새 []를 만들지 않도록 고정 참조 사용
const EMPTY: PerformanceInfoItem[] = [];

export const useLocalList = ({ props, enabled = true, staleTime = 1000 * 60 * 5 }: Props) => {
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
    staleTime,
  });

  return {
    result: data ?? EMPTY,
    loading: isFetching,
    error: error ? (error as Error).message : null,
  };
};
