import FastImage from '@d11/react-native-fast-image';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BlurImage from './BlurImage';

interface Props {
  imageInfo: string | null;
}

function PosterContent({ imageInfo }: Props) {
  const [aspectRatio, setAspectRatio] = useState<number>(3 / 4);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <BlurImage imageInfo={imageInfo} blur={30} />
        <View style={[styles.posterWrapper, { aspectRatio }]}>
          <FastImage
            source={{ uri: imageInfo ?? '' }}
            style={styles.poster}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}

export default PosterContent;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  container: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterWrapper: {
    width: '55%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
});
