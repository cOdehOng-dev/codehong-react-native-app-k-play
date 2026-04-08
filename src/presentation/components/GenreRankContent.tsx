import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { BoxofficeItem } from '../../domain/model/boxofficeItem';
import { GenreCodeItem } from '../../domain/type/genreCode';
import { RootStackNavigationProp } from '../screens/stack/RootStack';
import ArrowTitleContent from './ArrowTitleContent';
import RankPerformanceInfoContent from './RankPerformanceInfoContent';
import ScrollTab from './ScrollTab';
import PerformanceInfoSkeleton from './skeleton/PerformanceInfoSkeleton';

type Props = {
  title: string;
  tabList: GenreCodeItem[];
  selectedTab: GenreCodeItem;
  genreRankList: BoxofficeItem[];
  isLoading: boolean;
  onSelectTab: (tab: GenreCodeItem) => void;
  onClickMore: () => void;
};

function GenreRankContent({
  title,
  tabList,
  selectedTab,
  genreRankList,
  isLoading: loading,
  onSelectTab: onSelectedTab,
  onClickMore,
}: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const selectedIndex = Math.max(tabList.indexOf(selectedTab), 0);
  const tabTextList = useMemo(
    () => tabList.map(tab => tab.displayName),
    [tabList],
  );

  const renderItem = useCallback(
    ({ item }: { item: BoxofficeItem }) => (
      <RankPerformanceInfoContent
        item={item}
        onClick={() => {
          navigation.navigate('Detail', {
            performanceId: item.performanceId ?? '',
          });
        }}
      />
    ),
    [genreRankList],
  );

  const keyExtractor = useCallback(
    (item: BoxofficeItem, index: number) => item.performanceId ?? String(index),
    [],
  );

  return (
    <View style={styles.root}>
      <ArrowTitleContent title={title} onClickMore={onClickMore} />
      <ScrollTab
        initialSelectIndex={selectedIndex}
        tabList={tabList}
        tabTextList={tabTextList}
        onClickTab={(index, tabText) => {
          onSelectedTab(tabList[index]);
        }}
      />
      {loading ? (
        <View style={[styles.mt, styles.skeletonContainer]}>
          {Array.from({ length: 4 }).map((_, i) => (
            <PerformanceInfoSkeleton key={i} />
          ))}
        </View>
      ) : (
        <FlatList
          style={styles.mt}
          contentContainerStyle={styles.listContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={genreRankList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  );
}

export default GenreRankContent;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  mt: {
    marginTop: 14,
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  skeletonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
});
