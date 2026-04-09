import FastImage from '@d11/react-native-fast-image';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BoxofficeItem } from '../../domain/model/boxofficeItem';
import { extractParenthesesContent } from '../../domain/util/util';
import Badge from './Badge';

type Props = {
  item: BoxofficeItem;
  onClick: () => void;
};

function RankPerformanceInfoContent({ item, onClick }: Props) {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <View style={styles.thumbnailWrapper}>
        <FastImage
          source={{
            uri: item.posterUrl ?? '',
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.thumbnail}
          resizeMode={FastImage.resizeMode.cover}
        />
        {item.rank && <Text style={styles.rank}>{item.rank}</Text>}
      </View>
      <Text style={styles.prdName} numberOfLines={2} ellipsizeMode="tail">
        {item.performanceName}
      </Text>
      <Text style={styles.placeName} numberOfLines={1} ellipsizeMode="tail">
        {item.placeName}
      </Text>
      {item.performancePeriod && (
        <Text style={styles.period} numberOfLines={1} ellipsizeMode="tail">
          {item.performancePeriod}
        </Text>
      )}
      <View style={styles.badge}>
        <Badge text={extractParenthesesContent(item.area)} />
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
  thumbnailWrapper: {
    width: 130,
    height: 170,
  },
  thumbnail: {
    width: 130,
    height: 170,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  rank: {
    position: 'absolute',
    bottom: 6,
    left: 8,
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
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
  badge: {
    marginTop: 4,
  },
});

export default memo(RankPerformanceInfoContent);
