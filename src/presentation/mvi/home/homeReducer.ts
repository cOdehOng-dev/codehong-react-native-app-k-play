/**
 * [MVI - Reducer]
 *
 * Action을 받아 현재 State를 새로운 State로 변환하는 순수 함수다.
 * 비동기 처리, 사이드 이펙트 없이 오직 (State, Action) → State 만 담당한다.
 * ViewModel의 useReducer에 등록되어 dispatch(action) 호출 시 자동으로 실행된다.
 *
 * 의존 방향:
 *   HomeReducer → HomeState (반환 타입 및 spread 대상)
 *   HomeReducer → HomeAction (switch-case 판별)
 *   HomeReducer ← useHomeViewModel (useReducer의 첫 번째 인자로 주입)
 *
 * 원칙:
 *   - 동일한 (State, Action) 입력에는 항상 동일한 State를 반환해야 한다 (순수 함수)
 *   - API 호출, 위치 조회 등 사이드 이펙트는 절대 포함하지 않는다
 */

import { HomeAction } from './homeAction';
import { HomeState } from './homeState';

export const homeReducer = (
  state: HomeState,
  action: HomeAction,
): HomeState => {
  switch (action.type) {
    case 'SELECT_MONTH_RANK_TAB':
      return { ...state, selectedMonthRankTab: action.tab };
    case 'SELECT_LOCAL_REGION':
      return { ...state, selectedLocalTab: action.region };
    case 'SELECT_FESTIVAL_REGION':
      return { ...state, selectedFestivalTab: action.region };
    case 'SELECT_GENRE_RANK_TAB':
      return { ...state, selectedGenreRankTab: action.genre };
    case 'SET_MY_AREA_SIGN_GU_CODE':
      return { ...state, myAreaSignGuCode: action.code };
    case 'SET_MY_AREA_LOADING':
      return { ...state, isMyAreaLoading: action.loading };
    default:
      return state;
  }
};
