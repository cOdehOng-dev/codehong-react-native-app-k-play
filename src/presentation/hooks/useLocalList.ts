import { useCallback, useState } from 'react';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import { useDI } from '../../di/DIContext';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';
import { RegionCode, toRegionCode } from '../../domain/type/RegionCode';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';

interface State {
  result: PerformanceInfoItem[];
  loading: boolean;
  error: string | null;
}

interface Props {
  entireLocalList: Map<RegionCode, PerformanceInfoItem[]>;
  setEntireLocalList: (
    entireLocalList: Map<RegionCode, PerformanceInfoItem[]>,
  ) => void;
}

export function useLocalList({ entireLocalList, setEntireLocalList }: Props) {
  const { performanceUseCase } = useDI();
  const [state, setState] = useState<State>({
    result: [],
    loading: false,
    error: null,
  });

  const callApi = useCallback(
    async (props: PerformanceListProps) => {
      setState(s => ({ ...s, loading: true, error: null }));
      const code = toRegionCode(props.signGuCode);
      const cachedRegionList = entireLocalList.get(code);
      if (cachedRegionList && cachedRegionList.length > 0) {
        console.log(`test here 캐싱 있음`);
        setState({
          result: cachedRegionList,
          loading: false,
          error: null,
        });
        return;
      }
      try {
        console.log(`test here 캐싱 없음`);
        const performanceList = await performanceUseCase.getPerformanceList(
          props,
        );
        console.log(
          '[usePerformanceList] 응답 데이터:',
          JSON.stringify(performanceList, null, 2),
        );
        const next = new Map(entireLocalList);
        next.set(code, performanceList);
        setEntireLocalList(next);
        setState({
          result: performanceList,
          loading: false,
          error: null,
        });
      } catch (e) {
        console.log('[usePerformanceList] 에러:', e);
        setState({
          result: [],
          loading: false,
          error: (e as Error).message,
        });
      }
    },
    [performanceUseCase, entireLocalList, setEntireLocalList],
  );

  return { ...state, callApi };
}
