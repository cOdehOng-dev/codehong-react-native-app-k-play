import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

function IndicatorProgress() {
  // 무한 회전 애니메이션 (1초에 한 바퀴)
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [rotation]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container} pointerEvents="box-only">
      {/* 배경 이미지 */}
      <Image
        style={styles.background}
        source={require('../../assets/images/bg_indicator.png')}
        accessibilityElementsHidden
      />

      {/* 회전하는 Progress 아이콘 */}
      <Animated.Image
        style={[
          styles.indicator,
          { transform: [{ rotate: rotateInterpolation }] },
        ]}
        source={require('../../assets/images/ic_indicator.png')}
        accessibilityLabel="Loading"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: 48,
    height: 48,
    position: 'absolute',
  },
  indicator: {
    width: 20,
    height: 20,
  },
});

export default IndicatorProgress;
