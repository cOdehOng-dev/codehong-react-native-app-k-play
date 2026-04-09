import { DetailAction } from './detailAction';
import { DetailState } from './detailState';

export const detailReducer = (
  state: DetailState,
  action: DetailAction,
): DetailState => {
  switch (action.type) {
    case 'SET_PERFORMANCE_ID':
      return { ...state, id: action.id };
    default:
      return state;
  }
};
