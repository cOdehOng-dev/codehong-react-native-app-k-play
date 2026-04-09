import { useCallback, useMemo, useReducer } from 'react';
import { DetailAction } from './detailAction';
import { detailReducer } from './detailReducer';
import { initialDetailState } from './detailState';
import { useBookmark } from '../../hooks/useBookmark';
import { KOKOR_CLIENT_ID } from '@env';
import { usePerformanceDetail } from '../../hooks/usePerformanceDetail';
import { usePlaceDetail } from '../../hooks/usePlaceDetail';

export const useDetailViewModel = () => {
  const [state, dispatch] = useReducer(detailReducer, initialDetailState);

  const performaceDetailProps = useMemo(() => {
    return {
      servicekey: KOKOR_CLIENT_ID,
      id: state.id,
    };
  }, [state.id]);

  const {
    result: performanceDetail,
    loading: isLoadingPerformanceDetail,
    error: errorPerformanceDetail,
  } = usePerformanceDetail({ props: performaceDetailProps });

  const placeDetailProps = useMemo(() => {
    const name = performanceDetail?.facilityName?.split(' ')?.[0];
    return {
      servicekey: KOKOR_CLIENT_ID,
      currentPage: '1',
      rowsPerPage: '10',
      keyword: name ?? '',
    };
  }, [performanceDetail?.facilityName]);

  const {
    result: placeDetail,
    loading: isLoadingPlaceDetail,
    error: errorPlaceDetail,
  } = usePlaceDetail({ props: placeDetailProps });

  const { isBookmarked, saveBookmark, removeBookmark } = useBookmark(
    performanceDetail?.name,
  );

  // View → ViewModel 유일한 진입점
  // 순수 상태 변경은 reducer로, side effect(북마크 DB 작업)는 ViewModel이 직접 처리
  const onAction = useCallback(
    (action: DetailAction) => {
      switch (action.type) {
        case 'SAVE_BOOKMARK':
          if (!performanceDetail) return;
          saveBookmark({
            id: performanceDetail.id,
            name: performanceDetail.name,
            posterUrl: performanceDetail.posterUrl,
            startDate: performanceDetail.startDate,
            endDate: performanceDetail.endDate,
            facilityName: performanceDetail.facilityName,
          });
          return;
        case 'REMOVE_BOOKMARK':
          if (!performanceDetail) return;
          removeBookmark(performanceDetail.id ?? '');
          return;
        default:
          dispatch(action);
      }
    },
    [performanceDetail, saveBookmark, removeBookmark],
  );

  return {
    state,
    onAction,
    performanceDetail,
    isLoadingPerformanceDetail,
    errorPerformanceDetail,
    isBookmarked,
    placeDetail,
    isLoadingPlaceDetail,
    errorPlaceDetail,
  };
};
