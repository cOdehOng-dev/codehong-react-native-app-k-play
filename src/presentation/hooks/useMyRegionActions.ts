import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { clear, MyRegion, save } from '../../slice/myRegionSlice';
import { useAppDispatch } from './hooks';

export default function useMyRegionActions() {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      save: (payload: MyRegion) => dispatch(save(payload)),
      clear: () => dispatch(clear()),
    }),
    [dispatch],
  );
}
