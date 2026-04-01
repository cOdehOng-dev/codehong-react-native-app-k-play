import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PlaceDetail } from '../../../domain/model/place/placeDetail';
import {
  NaverMapMarkerOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map';

interface Props {
  placeDetail: PlaceDetail | null;
}

function PerformanceDetailPlaceContent({ placeDetail }: Props) {
  console.log(`placeDetail = ${JSON.stringify(placeDetail)}`);
  const latitudeStr = placeDetail?.latitude;
  const longitudeStr = placeDetail?.longitude;
  if (!latitudeStr || !longitudeStr) {
    console.log('위도 또는 경도 정보가 없습니다.');
    return;
  }
  const latitude = Number(latitudeStr);
  const longitude = Number(longitudeStr);
  console.log(`la = ${latitude} || lo = ${longitude}`);
  return (
    <View style={styles.root}>
      <View style={styles.divider} />
      <Text style={styles.title}>공연장소</Text>
      <View style={styles.mapContainer}>
        {latitude && longitude && (
          <NaverMapView
            style={styles.map}
            initialCamera={{
              latitude: latitude,
              longitude: longitude,
              zoom: 16,
            }}
            isShowScaleBar={false}
            isShowZoomControls={false}
          >
            <NaverMapMarkerOverlay latitude={latitude} longitude={longitude} />
          </NaverMapView>
        )}
      </View>
      <View style={styles.locationContainer}>
        <Image
          style={styles.locationIcon}
          source={require('../../../assets/images/ic_location.png')}
        />
        <Text style={styles.locationText}>{placeDetail?.placeAddress}</Text>
      </View>
    </View>
  );
}

export default PerformanceDetailPlaceContent;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: 'white',
  },
  divider: {
    width: '100%',
    height: 8,
    backgroundColor: '#5454571A',
    marginBottom: 16,
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 26,
  },
  mapContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  locationContainer: {
    paddingTop: 15,
    paddingHorizontal: 16,
    alignContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  locationIcon: {
    width: 18,
    height: 18,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    overflow: 'scroll',
  },
});
