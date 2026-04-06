import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';

// ──────────────────────────────────────────────
// 방법 1: withTypes (현재 사용 중) ← 선호하는 방법
//
// react-redux v9 / @reduxjs/toolkit v2 에서 추가된 공식 권장 방식
// useDispatch/useSelector에 타입을 미리 바인딩해서 반환
//
// 장점:
// - 사용처에서 매번 타입을 명시할 필요 없음
// - 공식 문서 권장 방식이라 유지보수에 유리
//
// 사용 예:
//   const dispatch = useAppDispatch();         // AppDispatch 타입 자동 적용
//   const region = useAppSelector(s => s.myRegion); // RootState 타입 자동 적용
// ──────────────────────────────────────────────
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// ──────────────────────────────────────────────
// 방법 2: 직접 타입을 명시한 커스텀 훅
//
// withTypes 이전에 많이 사용하던 방식
// 동작은 방법 1과 동일하지만 보일러플레이트가 조금 더 많음
//
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// ──────────────────────────────────────────────

// ──────────────────────────────────────────────
// 방법 3: 훅을 만들지 않고 호출부에서 직접 타입 명시
//
// 별도 훅 파일이 필요 없지만 사용처마다 타입을 반복 작성해야 함
// 프로젝트가 커질수록 불편하고 타입 누락 위험이 있음
//
// const dispatch = useDispatch<AppDispatch>();
// const region = useSelector((state: RootState) => state.myRegion);
// ──────────────────────────────────────────────
