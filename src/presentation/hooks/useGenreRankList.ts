import { useQuery } from '@tanstack/react-query';
import { useDI } from '../../di/DIContext';
import { BoxofficeProps } from '../../domain/model/apiprops/BoxofficeProps';
import { toGenreCode } from '../../domain/type/genreCode';

interface Props {
  props: BoxofficeProps;
}

export function useGenreRankList({ props }: Props) {
  const { boxOfficeUseCase } = useDI();
  const code = toGenreCode(props.genreCode);

  const { data, isFetching, error } = useQuery({
    queryKey: ['genreRankList', code],
    queryFn: () => boxOfficeUseCase.getRankList(props),
    staleTime: 1000 * 60 * 5,
  });

  return {
    result: data ?? [],
    loading: isFetching,
    error: error ? (error as Error).message : null,
  };
}
