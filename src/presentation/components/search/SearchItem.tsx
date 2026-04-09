import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { extractParenthesesContent } from '../../../domain/util/util';
import Badge from '../Badge';
import {
  getPeriod,
  PerformanceInfoItem,
} from '../../../domain/model/performanceInfoItem';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../screens/stack/RootStack';
import FastImage from '@d11/react-native-fast-image';

const SearchItem = ({ item }: { item: PerformanceInfoItem }) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Detail', {
          performanceId: item.id ?? '',
        });
      }}
    >
      <View style={styles.root}>
        <FastImage
          source={{
            uri: item.posterUrl ?? '',
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.thumbnail}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.period}>{getPeriod(item)}</Text>
          <Text style={styles.place}>{item.placeName}</Text>
          <View style={styles.mt}>
            <Badge text={extractParenthesesContent(item.genre)} fontSize={9} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
export default SearchItem;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  thumbnail: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  place: {
    fontSize: 13,
    color: '#545457',
    marginTop: 2,
  },
  period: {
    fontSize: 13,
    color: '#545457',
    marginTop: 2,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  mt: {
    marginTop: 4,
  },
});
