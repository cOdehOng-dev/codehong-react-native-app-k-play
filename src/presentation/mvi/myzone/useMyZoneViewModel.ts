import { initialMyZoneState } from './myZoneState';
import { useCallback, useMemo, useReducer } from 'react';
import useMyRegion from '../../hooks/useMyRegion';
import { myZoneReducer } from './myZoneReducer';
import { MyZoneAction } from './myZoneAction';
import { getCurrentMonthRange } from '../../../domain/util/dateUtil';
import { KOKOR_CLIENT_ID } from '@env';
import { useMyAreaList } from '../../hooks/useMyAreaList';
import { useMyZoneList } from '../../hooks/useMyZoneList';

export const useMyZoneViewModel = () => {
  const [state, dispatch] = useReducer(myZoneReducer, initialMyZoneState);
  const { myRegion } = useMyRegion();

  const onAction = useCallback((action: MyZoneAction) => {
    dispatch(action);
  }, []);

  const myZoneProps = useMemo(() => {
    const { startDate, endDate } = getCurrentMonthRange();
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
