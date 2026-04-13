import { KOKOR_CLIENT_ID } from '@env';
import { useCallback, useMemo, useReducer } from 'react';
import { useMyAreaList } from '../../hooks/useMyAreaList';
import useMyRegion from '../../hooks/useMyRegion';
import { useMyZoneList } from '../../hooks/useMyZoneList';
import { DateUtil } from './../../../domain/util/dateUtil';
import { MyZoneAction } from './myZoneAction';
import { myZoneReducer } from './myZoneReducer';
import { initialMyZoneState } from './myZoneState';

export const useMyZoneViewModel = () => {
  const [state, dispatch] = useReducer(myZoneReducer, initialMyZoneState);
  const { myRegion } = useMyRegion();

  const onAction = useCallback((action: MyZoneAction) => {
    dispatch(action);
  }, []);

  const myZoneProps = useMemo(() => {
    const { startDate, endDate } = DateUtil.getCurrentMonthRange();
    return {
      service: KOKOR_CLIENT_ID,
      startDate,
      endDate,
      currentPage: '1',
      rowsPerPage: '100',
      signGuCode: myRegion?.regionCode?.code ?? '',
    };
  }, [myRegion?.regionCode?.code]);

  const { result: myAreaList } = useMyAreaList({ props: myZoneProps });

  const placeNameList = useMemo(
    () => (myAreaList ?? []).map(p => p?.placeName ?? ''),
    [myAreaList],
  );

  const { result: placeDetails, loading: isLoadingPlaceDetails } =
    useMyZoneList({ placeNameList });

  return {
    state,
    onAction,
    myRegion,
    myAreaList,
    placeDetails,
    isLoadingPlaceDetails,
  };
};
