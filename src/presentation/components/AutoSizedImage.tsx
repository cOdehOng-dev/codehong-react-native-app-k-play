import FastImage from '@d11/react-native-fast-image';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export function AutoSizedImage({ uri }: { uri: string }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (containerWidth === 0) return;
    Image.getSize(uri, (w, h) => {
      setHeight((h / w) * containerWidth);
    });
  }, [uri, containerWidth]);

  return (
    <View
      style={styles.container}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {height > 0 && (
        <FastImage
          source={{ uri, priority: FastImage.priority.normal }}
          style={{ width: containerWidth, height }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
