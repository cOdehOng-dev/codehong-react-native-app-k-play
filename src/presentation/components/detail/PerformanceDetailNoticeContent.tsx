import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AutoSizedImage } from '../AutoSizedImage';
import FastImage from 'react-native-fast-image';

interface Props {
  imageUrlList: string[] | null;
}

function PerformanceDetailNoticeContent({ imageUrlList }: Props) {
  if (!imageUrlList || imageUrlList.length === 0) {
    return null;
  }

  return (
    <View style={styles.root}>
      <View style={styles.divider} />
      <Text style={styles.title}>공지사항</Text>
      {imageUrlList.map((url, index) => (
        <AutoSizedImage key={index} uri={url} />
      ))}
    </View>
  );
}

export default PerformanceDetailNoticeContent;

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
  image: {
    width: '100%',
    marginBottom: 16,
  },
});
