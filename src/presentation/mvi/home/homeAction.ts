/**
 * [MVI - Action]
 *
 * 사용자의 행동(액션)을 타입으로 정의한다.
 * View(HomeScreen)는 사용자 이벤트가 발생하면 Action을 생성해
 * ViewModel의 onAction()로 전달한다.
 * ViewModel은 Action을 받아 Reducer에게 위임하거나 비동기 작업을 처리한다.
 *
 * 의존 방향:
 *   HomeAction → HomeReducer (switch-case의 판별 기준)
 *   HomeAction → useHomeViewModel (onAction의 인자 타입)
 *   HomeAction ← HomeScreen (onAction 호출 시 Action 객체를 생성)
 *
 * 규칙:
 *   - 순수 UI 선택(탭, 지역 변경)은 Reducer가 동기 처리
 *   - 비동기 작업(위치 조회, API refetch)은 ViewModel이 직접 처리
 */

import { GenreCodeItem } from '../../../domain/type/genreCode';
import { RankTabItem } from '../../../domain/type/rankTab';
import { RegionCode } from '../../../domain/type/regionCode';

export type HomeAction =
  | { type: 'SELECT_MONTH_RANK_TAB'; tab: RankTabItem } // 월간 순위 탭 선택
  | { type: 'SELECT_LOCAL_REGION'; region: RegionCode } // 지역별 공연 지역 선택
  | { type: 'SELECT_FESTIVAL_REGION'; region: RegionCode } // 축제 지역 선택
  | { type: 'SELECT_GENRE_RANK_TAB'; genre: GenreCodeItem } // 장르 순위 탭 선택
  | { type: 'SET_MY_AREA_SIGN_GU_CODE'; code: string } // 내 지역 코드 업데이트 (위치 조회 완료 후)
  | { type: 'SET_MY_AREA_LOADING'; loading: boolean }; // 내 지역 로딩 상태 업데이트
