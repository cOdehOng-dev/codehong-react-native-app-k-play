import { MyZoneAction } from './myzoneAction';
import { MyZoneState } from './myzoneState';

export const myZoneReducer = (
  state: MyZoneState,
  action: MyZoneAction,
): MyZoneState => {
  switch (action.type) {
    case 'SET_SELECTED_PIN':
      return { ...state, selectedPin: action.payload };
    default:
      return state;
  }
};
