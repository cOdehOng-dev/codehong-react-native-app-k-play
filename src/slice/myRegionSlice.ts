import { RegionCode } from '../domain/type/regionCode';
import { Address } from './../domain/util/LocationUtil';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MyRegion {
  address: Address;
  regionCode: RegionCode;
}

interface MyRegionState {
  myRegion: MyRegion | null;
}

const initialState: MyRegionState = {
  myRegion: {
    address: { region1: '서울특별시', region2: '강남구', region3: '삼성동' },
    regionCode: RegionCode.SEOUL,
  },
};

const myRegionSlice = createSlice({
  name: 'myRegion',
  initialState,
  reducers: {
    save(state, action: PayloadAction<MyRegion>) {
      state.myRegion = action.payload;
    },
    clear(state) {
      state.myRegion = null;
    },
  },
});

export const { save, clear } = myRegionSlice.actions;
export default myRegionSlice.reducer;
