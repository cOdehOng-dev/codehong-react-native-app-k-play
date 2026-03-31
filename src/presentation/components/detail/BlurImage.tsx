import React from 'react';
import { Image, ImageResizeMode, StyleSheet, View } from 'react-native';

interface Props {
  imageInfo: string | null;
  blur: number;
  scaleType?: ImageResizeMode;
  borderRadius?: number;
}

function BlurImage(props: Props) {
  return (
    <View
      style={[styles.container, { borderRadius: props.borderRadius ?? 16 }]}
    >
      <Image
        source={{ uri: props.imageInfo ?? '' }}
        style={styles.image}
        resizeMode={props.scaleType}
        blurRadius={props.blur}
      />
    </View>
  );
}

export default BlurImage;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
