import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BookMarkPerformance } from '../../../domain/model/bookMarkPerformance';
import FastImage from '@d11/react-native-fast-image';

type Props = {
  item: BookMarkPerformance;
};

const BookmarkPerformance = ({ item }: Props) => {
  return (
    <>
      {item.posterUrl ? (
        <FastImage
          style={styles.poster}
          source={{
            uri: item.posterUrl ?? '',
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.poster, styles.posterPlaceholder]} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name ?? '-'}
        </Text>
        <Text style={styles.itemDate}>
          {item.startDate} ~ {item.endDate}
        </Text>
        <Text style={styles.itemFacility} numberOfLines={1}>
          {item.facilityName ?? '-'}
        </Text>
      </View>
    </>
  );
};

export default BookmarkPerformance;

const styles = StyleSheet.create({
  poster: {
    width: 100,
    height: 130,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginStart: 16,
  },
  posterPlaceholder: {
    backgroundColor: '#E0E0E0',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    marginEnd: 16,
    gap: 4,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  itemDate: {
    fontSize: 12,
    color: '#757575',
  },
  itemFacility: {
    fontSize: 12,
    color: '#9E9E9E',
  },
});
