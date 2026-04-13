import { PerformanceGroup } from '../../../domain/model/performanceGroup';

export type MyZoneAction = {
  type: 'SET_SELECTED_PIN';
  payload: PerformanceGroup | null;
};
