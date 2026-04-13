import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  getPeriod,
  PerformanceInfoItem,
} from '../../domain/model/performanceInfoItem';
import FastImage from '@d11/react-native-fast-image';
import Badge from './Badge';
import { extractParenthesesContent } from '../../domain/util/util';

type Props = {
  item: PerformanceInfoItem;
  onClick: () => void;
};
const PerformanceListInfoContent = ({ item, onClick }: Props) => {
  return (
    <Pressable style={styles.root} onPress={onClick}>
      <FastImage
        source={{
          uri: item.posterUrl ?? '',
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.thumbnail}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.contentContainer}>
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
          <Badge
            text={extractParenthesesContent(item.genre)}
            fontSize={9}
            paddingHorizontal={4}
            paddingVertical={2}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default PerformanceListInfoContent;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignContent: 'center',
  },
  thumbnail: {
    width: 100,
    height: 130,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 10,
  },
  prdName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 8,
  },
  placeName: {
    fontSize: 12,
    color: '#545457',
    marginTop: 8,
  },
  period: {
    fontSize: 10,
    color: '#545457',
    marginTop: 2,
  },
  mt: {
    marginTop: 10,
  },
});
