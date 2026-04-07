import {
  NaverMapMarkerOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { getCurrentMonthRange } from '../../domain/util/dateUtil';
import useMyRegion from '../hooks/useMyRegion';
import { KOKOR_CLIENT_ID } from '@env';
import { useMyAreaList } from '../hooks/useMyAreaList';
import { useMyZoneList } from '../hooks/useMyZoneList';
import { PerformanceGroup } from '../../domain/model/performanceGroup';

// const INITIAL_CAMERA = {
//   latitude: 37.5715,
//   longitude: 126.9769,
//   zoom: 14,
// };

function MyZoneScreen() {
  const { myRegion } = useMyRegion();
  console.log(`test here myRegion = ${JSON.stringify(myRegion)}`);

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

  const {
    result: myAreaList,
    loading: isLoadignMyAreaList,
    error: errorMyAreaList,
    refetch: refetchMyAreaList,
  } = useMyAreaList({ props: myZoneProps });

  const placeNameList = useMemo(
    () => (myAreaList ?? []).map(p => p?.placeName ?? ''),
    [myAreaList],
  );

  const {
    result: placeDetails,
    loading: isLoadingPlaceDetails,
    error: errorPlaceDetails,
  } = useMyZoneList({ placeNameList });

  const pinList = useMemo<PerformanceGroup[]>(() => {
    if (!placeDetails || placeDetails.length === 0) {
      return [];
    }

    const result: PerformanceGroup[] = [];

    placeDetails.forEach(placeDetail => {
      if (result.find(p => p?.placeName === placeDetail?.placeName)) {
        return;
      }
      if (placeDetail?.latitude && placeDetail?.longitude) {
        const performanceList: PerformanceGroup['performanceList'] = [];

        myAreaList?.forEach(myArea => {
          if (myArea?.placeName === placeDetail?.placeName) {
            performanceList?.push(myArea);
          }
        });

        result.push({
          placeName: placeDetail?.placeName ?? '',
          lat: Number(placeDetail?.latitude),
          lng: Number(placeDetail?.longitude),
          performanceList,
        });
      }
    });

    return result;
  }, [placeDetails, myAreaList]);

  const initialCamera = useMemo(() => {
    const myLat = myRegion?.latitude;
    const myLng = myRegion?.longitude;

    if (!myLat || !myLng || pinList.length === 0) {
      return { latitude: myLat ?? 0, longitude: myLng ?? 0, zoom: 12 };
    }

    const closest = pinList.reduce((prev, curr) => {
      const prevDist =
        Math.pow((prev.lat ?? 0) - myLat, 2) +
        Math.pow((prev.lng ?? 0) - myLng, 2);
      const currDist =
        Math.pow((curr.lat ?? 0) - myLat, 2) +
        Math.pow((curr.lng ?? 0) - myLng, 2);
      return currDist < prevDist ? curr : prev;
    });

    return {
      latitude: closest.lat ?? 0,
      longitude: closest.lng ?? 0,
      zoom: 12,
    };
  }, [pinList, myRegion?.latitude, myRegion?.longitude]);

  // pinList.forEach(item => {
  //   if (item.placeName === '성남아트센터') {
  //     console.log(
  //       `test here pin performanceList = ${JSON.stringify(
  //         item.performanceList?.length ?? 0,
  //       )}`,
  //     );
  //   }
  // });

  console.log(
    `test here 111 latitude = ${myRegion?.latitude} || longitude = ${myRegion?.longitude}`,
  );

  return (
    <View style={styles.container}>
      <NaverMapView
        style={styles.container}
        initialCamera={initialCamera}
        isShowZoomControls={false}
      >
        {pinList?.map(pin => {
          if (pin.lat && pin.lng) {
            return (
              <NaverMapMarkerOverlay
                key={pin.placeName}
                latitude={pin.lat ?? 0}
                longitude={pin.lng ?? 0}
              />
            );
          }
        })}
        {/* <NaverMapMarkerOverlay latitude={37.5666102} longitude={126.9783881} />
        <NaverMapMarkerOverlay latitude={37.5796} longitude={126.977} />
        <NaverMapMarkerOverlay latitude={37.5657} longitude={126.975} /> */}
      </NaverMapView>
    </View>
  );
}

export default MyZoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
