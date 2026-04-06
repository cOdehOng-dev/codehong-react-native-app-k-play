import { useQuery } from '@tanstack/react-query';
import { useDI } from '../../di/DIContext';
import { BoxofficeProps } from '../../domain/model/apiprops/boxofficeProps';

type Props = {
  props: BoxofficeProps;
};

export const useMonthRankList = ({ props }: Props) => {
  const { boxofficeUseCase } = useDI();

  const { data, isFetching, error } = useQuery({
    queryKey: ['monthRankList', [props.startDate, props.endDate]],
    queryFn: () => boxofficeUseCase.getRankList(props),
    staleTime: 1000 * 60 * 5,
  });

  return {
    result: data ?? [],
    loading: isFetching,
    error: error ? (error as Error).message : null,
  };
};
