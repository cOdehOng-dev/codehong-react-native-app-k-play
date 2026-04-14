import { useCallback, useReducer } from 'react';
import { localPerformanceListReducer } from './localPerformanceListReducer';
import { initialLocalPerformanceListState } from './localPerformanceListState';
import { LocalPerformanceListAction } from './localPerformanceListAction';

export const useLocalPerformanceListViewModel = () => {
  const [state, dispatch] = useReducer(
    localPerformanceListReducer,
    initialLocalPerformanceListState,
  );

  const onAction = useCallback((action: LocalPerformanceListAction) => {
    dispatch(action);
  }, []);
};
