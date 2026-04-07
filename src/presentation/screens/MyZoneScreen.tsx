import {
  NaverMapMarkerOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCurrentMonthRange } from '../../domain/util/dateUtil';
import useMyRegion from '../hooks/useMyRegion';
import { KOKOR_CLIENT_ID } from '@env';
import { useMyAreaList } from '../hooks/useMyAreaList';
import { useMyZoneList } from '../hooks/useMyZoneList';
import { PerformanceGroup } from '../../domain/model/performanceGroup';

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

  return (
    <View style={styles.container}>
      <NaverMapView
        style={styles.container}
        initialCamera={initialCamera}
        isShowZoomControls={false}
      >
        {pinList?.map(pin => {
          if (pin.lat && pin.lng) {
            const count = pin.performanceList?.length ?? 0;
            return (
              <NaverMapMarkerOverlay
                key={pin.placeName}
                latitude={pin.lat}
                longitude={pin.lng}
                width={60}
                height={62}
                anchor={{ x: 0.5, y: 1 }}
              >
                <View collapsable={false} style={styles.markerWrapper}>
                  <MaterialIcons
                    name="place"
                    size={52}
                    color="#FF8224"
                    style={styles.pinIcon}
                  />
                  {count >= 2 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{count}</Text>
                    </View>
                  )}
                </View>
              </NaverMapMarkerOverlay>
            );
          }
        })}
      </NaverMapView>
    </View>
  );
}

export default MyZoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markerWrapper: {
    width: 60,
    height: 62,
  },
  pinIcon: {
    position: 'absolute',
    bottom: 0,
    left: 4,
  },
  badge: {
    position: 'absolute',
    top: 7,
    right: 8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF322E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
