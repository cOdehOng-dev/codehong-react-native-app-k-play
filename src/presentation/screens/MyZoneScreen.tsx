import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NaverMapView } from '@mj-studio/react-native-naver-map';

const INITIAL_CAMERA = {
  latitude: 37.5666102,
  longitude: 126.9783881,
  zoom: 12,
};

function MyZoneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <NaverMapView style={styles.container} initialCamera={INITIAL_CAMERA} />
      </View>
    </SafeAreaView>
  );
}

export default MyZoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
