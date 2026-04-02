import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { getPeriod } from '../../domain/model/PerformanceInfoItem';
import Badge from './Badge';
import { extractParenthesesContent } from '../../domain/util/util';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';

type Props = {
  item: BoxOfficeItem;
  onClick: () => void;
};

function RankPerformanceInfoContent({ item, onClick }: Props) {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <Image
        source={{ uri: item.posterUrl ?? '' }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
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
  badge: {
    marginTop: 4,
  },
});

export default RankPerformanceInfoContent;
