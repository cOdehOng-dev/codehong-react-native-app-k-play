import { useQuery } from '@tanstack/react-query';
import { useDI } from '../../di/DIContext';
import { PlaceDetailProps } from '../../domain/model/apiprops/placeDetailProps';

type Props = {
  props: PlaceDetailProps;
};

export const usePlaceDetail = ({ props }: Props) => {
  const { placeUseCase } = useDI();

  const { data, isLoading, error } = useQuery({
    queryKey: ['placeDetail', props.keyword],
    queryFn: () =>
      placeUseCase.searchPlace(props, msg =>
        console.log('[usePlaceDetail] API 에러:', msg),
      ),
    staleTime: 0,
  });

  return {
    result: data ?? null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
  };
};
