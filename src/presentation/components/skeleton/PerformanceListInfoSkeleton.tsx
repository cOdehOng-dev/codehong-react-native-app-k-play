import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Skeleton from './Skeleton';

const PerformanceListInfoSkeleton = () => {
  return (
    <Skeleton>
      <View style={styles.root}>
        <View style={styles.thumbnail} />
        <View style={styles.contentContainer}>
          <View style={styles.prdName} />
          <View style={styles.placeName} />
          <View style={styles.period} />
        </View>
      </View>
    </Skeleton>
  );
};

export default PerformanceListInfoSkeleton;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  thumbnail: {
    width: 100,
    height: 130,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 10,
  },
  prdName: {
    height: 16,
    width: '70%',
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginTop: 8,
  },
  placeName: {
    height: 12,
    width: '50%',
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginTop: 8,
  },
  period: {
    height: 10,
    width: '40%',
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginTop: 6,
  },
});
