import { PerformanceGroup } from '../../../domain/model/performanceGroup';

export type MyZoneState = {
  selectedPin: PerformanceGroup | null;
};

export const initialMyZoneState: MyZoneState = {
  selectedPin: null,
};
