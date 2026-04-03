import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../screens/stack/RootStack';
import ArrowTitleContent from './ArrowTitleContent';
import { GenreCodeItem } from '../../domain/type/GenreCode';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import ScrollTab from './ScrollTab';
import PerformanceInfoContent from './PerformanceInfoContent';
import PerformanceInfoSkeleton from './skeleton/PerformanceInfoSkeleton';
import RankPerformanceInfoContent from './RankPerformanceInfoContent';

type Props = {
  title: string;
  tabList: GenreCodeItem[];
  selectedTab: GenreCodeItem;
  genreRankList: BoxOfficeItem[];
  loading: boolean;
  onSelectedTab: (tab: GenreCodeItem) => void;
  onClickMore: () => void;
};

function GenreRankContent({
  title,
  tabList,
  selectedTab,
  genreRankList,
  loading,
  onSelectedTab,
  onClickMore,
}: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const selectedIndex = Math.max(tabList.indexOf(selectedTab), 0);
  const tabTextList = useMemo(() => tabList.map(tab => tab.displayName), [tabList]);
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
          renderItem={({ item }) => (
            <RankPerformanceInfoContent
              item={item}
              onClick={() => {
                navigation.navigate('Detail', {
                  performanceId: item.performanceId ?? '',
                });
              }}
            />
          )}
          keyExtractor={(item, index) => item.performanceId ?? String(index)}
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
