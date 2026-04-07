import { useQueries } from '@tanstack/react-query';
import { useDI } from '../../di/DIContext';
import { KOKOR_CLIENT_ID } from '@env';

type Props = {
  placeNameList: string[];
};

export const useMyZoneList = ({ placeNameList }: Props) => {
  const { placeUseCase } = useDI();

  return useQueries({
    queries: placeNameList.map(placeName => {
      const keyword = placeName?.split(' ')?.[0] ?? '';
      return {
        queryKey: ['placeDetail', keyword],
        queryFn: () =>
          placeUseCase.searchPlace(
            {
              servicekey: KOKOR_CLIENT_ID,
              currentPage: '1',
              rowsPerPage: '10',
              keyword,
            },
            msg => console.log('[useMyZoneList] placeDetail 에러:', msg),
          ),
        staleTime: 0,
        enabled: keyword.length > 0,
      };
    }),
    // combine: 실제 data가 바뀔 때만 새 객체를 반환 → 무한루프 방지
    combine: results => ({
      result: results.map(q => q.data ?? null),
      loading: results.some(q => q.isLoading),
      error:
        (results.find(q => q.error)?.error as Error | null)?.message ?? null,
    }),
  });
};
