import {
  NaverMapMarkerOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const INITIAL_CAMERA = {
  latitude: 37.5715,
  longitude: 126.9769,
  zoom: 14,
};

function MyZoneScreen() {
  return (
    <View style={styles.container}>
      <NaverMapView
        style={styles.container}
        initialCamera={INITIAL_CAMERA}
        isShowZoomControls={false}
      >
        <NaverMapMarkerOverlay latitude={37.5666102} longitude={126.9783881} />
        <NaverMapMarkerOverlay latitude={37.5796} longitude={126.977} />
        <NaverMapMarkerOverlay latitude={37.5657} longitude={126.975} />
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
