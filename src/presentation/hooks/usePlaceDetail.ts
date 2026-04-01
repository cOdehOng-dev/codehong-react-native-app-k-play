import { useCallback, useState } from 'react';
import { PlaceDetail } from '../../domain/model/place/placeDetail';
import { SearchPlaceProps } from '../../domain/model/apiprops/searchPlaceProps';
import { useDI } from '../../di/DIContext';

interface State {
  placeDetail: PlaceDetail | null;
  loading: boolean;
  error: string | null;
}

export function usePlaceDetail() {
  const { placeUseCase } = useDI();
  const [state, setState] = useState<State>({
    placeDetail: null,
    loading: true,
    error: null,
  });

  const callPlaceDetailApi = useCallback(
    async (props: SearchPlaceProps) => {
      setState(s => ({ ...s, loading: true, error: null }));
      try {
        const placeDetail = await placeUseCase.searchPlace(props, msg =>
          console.log('[usePlaceDetail] API 에러:', msg),
        );
        console.log(
          '[usePlaceDetail] 응답 데이터:',
          JSON.stringify(placeDetail, null, 2),
        );
        setState({
          placeDetail: placeDetail,
          loading: false,
          error: null,
        });
      } catch (e) {
        console.log('[usePlaceDetail] 에러:', e);
        setState({
          placeDetail: null,
          loading: false,
          error: '에러가 발생했습니다.',
        });
      }
    },
    [placeUseCase],
  );

  return {
    ...state,
    callPlaceDetailApi,
  };
}
