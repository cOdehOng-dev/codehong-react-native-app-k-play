import { useCallback, useState } from 'react';
import { useDI } from '../../di/DIContext';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import { BoxOfficeParams } from '../../domain/model/apiprops/BoxOfficeParams';

interface State {
  result: BoxOfficeItem[];
  loading: boolean;
  error: string | null;
}

export function useBoxofficeList() {
  const { boxOfficeUseCase } = useDI();
  const [state, setState] = useState<State>({
    result: [],
    loading: false,
    error: null,
  });

  const callApi = useCallback(
    async (params: BoxOfficeParams) => {
      setState(s => ({ ...s, loading: true, error: null }));
      try {
        const boxOfficeList = await boxOfficeUseCase.getBoxOfficeList(params);
        console.log(
          '[useBoxOfficeList] 응답 데이터:',
          JSON.stringify(boxOfficeList, null, 2),
        );
        setState({
          result: boxOfficeList,
          loading: false,
          error: null,
        });
      } catch (e) {
        console.log('[useBoxOfficeList] 에러:', e);
        setState({
          result: [],
          loading: false,
          error: (e as Error).message,
        });
      }
    },
    [boxOfficeUseCase],
  );

  return { ...state, callApi };
}
