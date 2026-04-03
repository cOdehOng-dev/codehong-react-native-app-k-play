// 수정: useCallback, useState 제거 → useQuery로 대체
import { keepPreviousData, useQuery } from '@tanstack/react-query'; // 추가
import { useDI } from '../../di/DIContext';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';
import { toRegionCode } from '../../domain/type/RegionCode';

interface Props {
  props: PerformanceListProps;
}

export function useFestivalList({ props }: Props) {
  const { performanceUseCase } = useDI();

  // queryKey에 사용해 지역별 캐싱
  const regionCode = toRegionCode(props.signGuCode);

  const { data, isFetching, error } = useQuery({
    queryKey: ['festivalList', regionCode], // 지역 코드 기반 캐시 키
    queryFn: () =>
      performanceUseCase.getFestivalList(props, msg =>
        console.log('[useFestivalList] API 에러:', msg),
      ),
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });

  return {
    result: data ?? [],
    loading: isFetching,
    error: error ? (error as Error).message : null,
  };
}
