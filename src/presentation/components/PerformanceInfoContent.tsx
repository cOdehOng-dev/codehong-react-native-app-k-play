import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  getPeriod,
  PerformanceInfoItem,
} from '../../domain/model/performanceInfoItem';
import { extractParenthesesContent } from '../../domain/util/util';
import Badge from './Badge';

type Props = {
  item: PerformanceInfoItem;
  onClick: () => void;
};

function PerformanceInfoContent({ item, onClick }: Props) {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <FastImage
        source={{
          uri: item.posterUrl ?? '',
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.thumbnail}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.prdName} numberOfLines={2} ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text style={styles.placeName} numberOfLines={1} ellipsizeMode="tail">
        {item.placeName}
      </Text>
      {getPeriod(item) && (
        <Text style={styles.period} numberOfLines={1} ellipsizeMode="tail">
          {getPeriod(item)}
        </Text>
      )}
      <View style={styles.mt}>
        <Badge text={extractParenthesesContent(item.genre)} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    width: 130,
    height: '100%',
  },
  thumbnail: {
    width: 130,
    height: 170,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  prdName: {
    width: 130,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 8,
  },
  placeName: {
    width: 130,
    fontSize: 12,
    color: '#545457',
    marginTop: 8,
  },
  period: {
    width: 130,
    fontSize: 10,
    color: '#545457',
    marginTop: 2,
  },
  mt: {
    marginTop: 4,
  },
});

export default PerformanceInfoContent;
