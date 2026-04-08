/**
 * [MVI - ViewModel]
 *
 * MVI의 핵심 조율자(Orchestrator) 역할을 한다.
 *
 * 책임:
 *   1. useReducer로 State를 보유하고 Reducer와 연결
 *   2. View에서 전달된 Action를 받아 처리
 *      - 동기 상태 변경 → dispatch(action)로 Reducer에 위임
 *      - 비동기 작업(위치 조회, API refetch) → ViewModel이 직접 처리 후 dispatch
 *   3. TanStack Query 훅들을 조합해 서버 데이터를 관리
 *   4. State와 데이터를 View에 반환
 *
 * 의존 방향:
 *   useHomeViewModel → HomeState    (useReducer로 상태 보유)
 *   useHomeViewModel → HomeAction   (onAction 인자 타입)
 *   useHomeViewModel → HomeReducer  (useReducer 첫 번째 인자)
 *   useHomeViewModel → 각종 Query 훅 (서버 데이터 fetch)
 *   useHomeViewModel ← HomeScreen   (훅으로 호출해 state/onAction를 받아감)
 *
 * 전체 데이터 흐름:
 *   HomeScreen → onAction(action) → dispatch / 비동기 처리
 *   → Reducer가 새 State 반환 → useReducer가 리렌더 트리거
 *   → HomeScreen이 새 state를 받아 UI 업데이트
 */

import { KOKOR_CLIENT_ID } from '@env';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { Alert } from 'react-native';
import { nameToRegionCode, RegionCode } from '../../../domain/type/regionCode';
import {
  getCurrentMonthRange,
  getPreviousMonthFirstDay,
  getPreviousMonthLastDay,
} from '../../../domain/util/dateUtil';
import {
  checkLocationPermission,
  getAddressFromCoords,
  getCurrentPosition,
  requestLocationPermission,
} from '../../../domain/util/LocationUtil';
import { useFestivalList } from '../../hooks/useFestivalList';
import { useGenreRankList } from '../../hooks/useGenreRankList';
import { useLocalList } from '../../hooks/useLocalList';
import { useMonthRankList } from '../../hooks/useMonthRankList';
import { useMyAreaList } from '../../hooks/useMyAreaList';
import useMyRegionActions from '../../hooks/useMyRegionActions';
import { HomeAction } from './homeAction';
import { homeReducer } from './homeReducer';
import { initialHomeState } from './homeState';

export const useHomeViewModel = () => {
  // Reducer와 연결: State의 단일 진실 공급원(Single Source of Truth)
  const [state, dispatch] = useReducer(homeReducer, initialHomeState);
  const { save: saveMyRegion } = useMyRegionActions();

  /**
   * View가 사용하는 유일한 액션 진입점.
   * 동기 Action는 dispatch로 Reducer에 위임한다.
   * (비동기 Action는 아래 handleRefresh처럼 별도 함수로 처리)
   */
  const onAction = useCallback((action: HomeAction) => {
    dispatch(action);
  }, []);

  // 앱 최초 진입 시 위치 권한 확인 후 내 지역 코드를 State에 저장
  useEffect(() => {
    (async () => {
      try {
        const hasPermission = await checkLocationPermission();
        const regionCode = hasPermission
          ? await fetchRegionCodeFromLocation()
          : RegionCode.SEOUL.code;
        dispatch({ type: 'SET_MY_AREA_SIGN_GU_CODE', code: regionCode });
      } catch {
        dispatch({
          type: 'SET_MY_AREA_SIGN_GU_CODE',
          code: RegionCode.SEOUL.code,
        });
      }
    })();
  }, []);

  // ─────────────────────────────────────────────────────
  // 비동기 처리: 위치 조회 → 지역 코드 추출 → State 업데이트
  // Reducer는 순수 함수이므로 비동기 로직은 ViewModel이 직접 담당한다.
  // ─────────────────────────────────────────────────────
  const fetchRegionCodeFromLocation = useCallback(async (): Promise<string> => {
    const { latitude, longitude } = await getCurrentPosition();
    const address = await getAddressFromCoords(latitude, longitude);
    const regionCode = nameToRegionCode(address.region1);
    saveMyRegion({
      address,
      regionCode,
      latitude,
      longitude,
    });
    return regionCode.code;
  }, [saveMyRegion]);

  // ─────────────────────────────────────────────────────
  // TanStack Query 훅 조합
  // 서버 상태(data, loading, error)는 Query 훅이 관리하고,
  // UI 선택 상태(탭, 지역)만 Reducer State가 관리한다.
  // ─────────────────────────────────────────────────────

  // 내 지역 공연 리스트: state.myAreaSignGuCode가 바뀔 때마다 재조회
  const myAreaListProps = useMemo(() => {
    const { startDate, endDate } = getCurrentMonthRange();
    return {
      service: KOKOR_CLIENT_ID,
      startDate,
      endDate,
      currentPage: '1',
      rowsPerPage: '10',
      signGuCode: state.myAreaSignGuCode,
    };
  }, [state.myAreaSignGuCode]);

  const {
    result: myAreaList,
    loading: isMyAreaListLoading,
    refetch: refetchMyAreaList,
  } = useMyAreaList({ props: myAreaListProps });

  // Query의 로딩 상태를 Reducer State에 동기화
  useEffect(() => {
    dispatch({ type: 'SET_MY_AREA_LOADING', loading: isMyAreaListLoading });
  }, [isMyAreaListLoading]);

  /**
   * 새로고침 Action 처리 (비동기이므로 Reducer 대신 ViewModel이 직접 처리)
   * 위치 재조회 → 지역 코드가 바뀌면 State 업데이트, 같으면 Query refetch
   */
  const handleRefresh = useCallback(async () => {
    dispatch({ type: 'SET_MY_AREA_LOADING', loading: true });
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('위치 권한 없음', '설정에서 위치 권한을 허용해주세요.');
      dispatch({ type: 'SET_MY_AREA_LOADING', loading: false });
      return;
    }
    try {
      const regionCode = await fetchRegionCodeFromLocation();
      if (regionCode === state.myAreaSignGuCode) {
        refetchMyAreaList();
      } else {
        dispatch({ type: 'SET_MY_AREA_SIGN_GU_CODE', code: regionCode });
      }
    } catch {
      Alert.alert('오류', '현재 위치를 가져올 수 없습니다.');
      dispatch({ type: 'SET_MY_AREA_LOADING', loading: false });
    }
  }, [state.myAreaSignGuCode, fetchRegionCodeFromLocation, refetchMyAreaList]);

  // 월간 인기 순위: 날짜 고정이므로 deps 없음
  const monthRankListProps = useMemo(
    () => ({
      service: KOKOR_CLIENT_ID,
      startDate: getPreviousMonthFirstDay('YYYYMMDD'),
      endDate: getPreviousMonthLastDay('YYYYMMDD'),
    }),
    [],
  );
  const { result: monthRankList, loading: isMonthRankListLoading } =
    useMonthRankList({ props: monthRankListProps });

  // 지역별 공연 리스트: state.selectedLocalRegionCode(Action로 변경)가 바뀔 때마다 재조회
  const localListProps = useMemo(
    () => ({
      service: KOKOR_CLIENT_ID,
      startDate: getPreviousMonthFirstDay('YYYYMMDD'),
      endDate: getPreviousMonthLastDay('YYYYMMDD'),
      currentPage: '1',
      rowsPerPage: '10',
      signGuCode: state.selectedLocalTab.code,
    }),
    [state.selectedLocalTab],
  );
  const { result: localList, loading: isLocalListLoading } = useLocalList({
    props: localListProps,
  });

  // 축제 리스트: state.selectedFestivalRegionCode(Action로 변경)가 바뀔 때마다 재조회
  const festivalListProps = useMemo(
    () => ({
      service: KOKOR_CLIENT_ID,
      startDate: getPreviousMonthFirstDay('YYYYMMDD'),
      endDate: getPreviousMonthLastDay('YYYYMMDD'),
      currentPage: '1',
      rowsPerPage: '10',
      signGuCode: state.selectedFestivalTab.code,
    }),
    [state.selectedFestivalTab],
  );
  const { result: festivalList, loading: isFestivalLoading } = useFestivalList({
    props: festivalListProps,
  });

  // 장르별 순위: state.selectedGenreRankTab(Action로 변경)가 바뀔 때마다 재조회
  const genreRankListProps = useMemo(
    () => ({
      service: KOKOR_CLIENT_ID,
      startDate: getPreviousMonthFirstDay('YYYYMMDD'),
      endDate: getPreviousMonthLastDay('YYYYMMDD'),
      genreCode: state.selectedGenreRankTab.code,
    }),
    [state.selectedGenreRankTab],
  );
  const { result: genreRankList, loading: isGenreRankListLoading } =
    useGenreRankList({ props: genreRankListProps });

  // View에 필요한 State와 데이터를 반환
  // View는 이 값들을 읽기만 하고, 변경은 반드시 onAction를 통해서만 한다.
  return {
    state,
    onAction,
    handleRefresh,
    myAreaList,
    monthRankList,
    localList,
    festivalList,
    genreRankList,
    isMonthRankListLoading,
    isLocalListLoading,
    isFestivalLoading,
    isGenreRankListLoading,
  };
};
