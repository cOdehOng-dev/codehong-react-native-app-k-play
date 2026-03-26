import { useCallback, useState } from 'react';
import { useDI } from '../../di/DIContext';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import { BoxOfficeParams } from '../../domain/model/apiparams/BoxOfficeParams';

interface State {
  boxofficeList: BoxOfficeItem[];
  isLoading: boolean;
  error: string | null;
}

export function useBoxOfficeList() {
  const { boxOfficeListUseCase } = useDI();
  const [state, setState] = useState<State>({
    boxofficeList: [],
    isLoading: false,
    error: null,
  });

  const callBoxofficeList = useCallback(
    async (params: BoxOfficeParams) => {
      setState(s => ({ ...s, isLoading: true, error: null }));
      try {
        const boxOfficeList = await boxOfficeListUseCase.getBoxOfficeList(
          params,
        );
        console.log(
          '[useBoxOfficeList] 응답 데이터:',
          JSON.stringify(boxOfficeList, null, 2),
        );
        setState({
          boxofficeList: boxOfficeList,
          isLoading: false,
          error: null,
        });
      } catch (e) {
        console.log('[useBoxOfficeList] 에러:', e);
        setState({
          boxofficeList: [],
          isLoading: false,
          error: (e as Error).message,
        });
      }
    },
    [boxOfficeListUseCase],
  );

  return { ...state, callBoxofficeList };
}
