import FastImage from '@d11/react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  getPeriod,
  PerformanceInfoItem,
} from '../../domain/model/performanceInfoItem';
import { extractParenthesesContent } from '../../domain/util/util';
import CustomBadge from '../components/CustomBadge';
import IndicatorProgress from '../components/IndicatorProgress';
import SearchBar from '../components/search/SearchBar';
import { useSearchViewModel } from '../mvi/search/useSearchViewModel';
import { RootStackNavigationProp } from './stack/RootStack';

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
      <View style={itemStyles.root}>
        <FastImage
          source={{
            uri: item.posterUrl ?? '',
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={itemStyles.thumbnail}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={itemStyles.infoContainer}>
          <Text style={itemStyles.name} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={itemStyles.period}>{getPeriod(item)}</Text>
          <Text style={itemStyles.place}>{item.placeName}</Text>
          <View style={itemStyles.mt}>
            <CustomBadge
              text={extractParenthesesContent(item.genre)}
              fontSize={9}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const SearchScreen = () => {
  const { state, onAction, searchResultList, isSearchResultListLoading } =
    useSearchViewModel();
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <SearchBar
        keyword={state.keyword}
        onSearch={keyword => onAction({ type: 'SET_KEYWORD', keyword })}
      />
      {isSearchResultListLoading ? (
        <IndicatorProgress />
      ) : searchResultList.length > 0 ? (
        <FlatList
          data={searchResultList}
          renderItem={({ item }) => <SearchItem item={item} />}
          keyExtractor={(item, index) => item.id ?? String(index)}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>검색 결과가 없어요.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
});

const itemStyles = StyleSheet.create({
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

export default SearchScreen;
