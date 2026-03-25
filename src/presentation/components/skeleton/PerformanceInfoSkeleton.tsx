import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

function PerformanceInfoSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.thumbnail} />
      <View style={styles.titleLine} />
      <View style={styles.titleLineShort} />
      <View style={styles.subLine} />
      <View style={styles.periodLine} />
      <View style={styles.badge} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 130,
    flexDirection: 'column',
  },
  thumbnail: {
    width: 130,
    height: 170,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  titleLine: {
    width: 120,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginTop: 8,
  },
  titleLineShort: {
    width: 80,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
  },
  subLine: {
    width: 100,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginTop: 8,
  },
  periodLine: {
    width: 90,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
  },
  badge: {
    width: 50,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E0E0E0',
    marginTop: 6,
  },
});

export default PerformanceInfoSkeleton;
