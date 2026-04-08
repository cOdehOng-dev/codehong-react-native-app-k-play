/**
 * [MVI - State]
 *
 * 화면의 모든 UI 상태를 하나의 객체로 정의한다.
 * ViewModel(useHomeViewModel)이 이 State를 보유하고,
 * View(HomeScreen)는 State를 읽어 렌더링만 담당한다.
 *
 * 의존 방향:
 *   HomeState ← HomeReducer (state를 인자로 받아 새 state를 반환)
 *   HomeState ← useHomeViewModel (useReducer로 state를 보유)
 *   HomeState → HomeScreen (props로 전달받아 렌더링)
 */

import { GenreCode, GenreCodeItem } from '../../../domain/type/genreCode';
import { RankTab, RankTabItem } from '../../../domain/type/rankTab';
import { RegionCode } from '../../../domain/type/regionCode';

export type HomeState = {
  selectedMonthRankTab: RankTabItem;
  selectedLocalTab: RegionCode;
  selectedFestivalTab: RegionCode;
  selectedGenreRankTab: GenreCodeItem;
  myAreaSignGuCode: string;
  isMyAreaLoading: boolean;
};

/** State의 초기값. useReducer 생성 시 ViewModel에서 주입된다. */
export const initialHomeState: HomeState = {
  selectedMonthRankTab: RankTab.TOP_1_10,
  selectedLocalTab: RegionCode.SEOUL,
  selectedFestivalTab: RegionCode.SEOUL,
  selectedGenreRankTab: GenreCode.THEATER,
  myAreaSignGuCode: RegionCode.SEOUL.code,
  isMyAreaLoading: false,
};
