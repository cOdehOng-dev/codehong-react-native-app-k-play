import { configureStore } from '@reduxjs/toolkit';
import myRegionReducer from '../slice/myRegionSlice';

const store = configureStore({
  reducer: {
    myRegion: myRegionReducer,
  },
});

// RootState: 전체 store 상태의 타입 → useAppSelector의 state 타입으로 사용
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch: dispatch 함수의 타입 (thunk 액션 포함) → useAppDispatch의 반환 타입으로 사용
export type AppDispatch = typeof store.dispatch;

export default store;
