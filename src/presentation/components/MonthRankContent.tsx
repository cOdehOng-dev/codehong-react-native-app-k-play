import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PerformanceInfoSkeleton from './skeleton/PerformanceInfoSkeleton';
import { RankTabItem, RankTabList } from '../../domain/type/RankTab';
import ScrollTab from './ScrollTab';

type Props = {
  currentMonth: string;
  loading: boolean;
  tabList: RankTabItem[];
  selectedTab: RankTabItem;
  onSelectTab: (tab: RankTabItem) => void;
  onClickProduct: () => void;
};
function MonthRankContent({ currentMonth, tabList, loading }: Props) {
  return (
    <View style={styles.block}>
      <Text style={styles.title}>{currentMonth}월 인기 순위 Top50</Text>
      <ScrollTab
        initialSelectIndex={0}
        tabList={tabList}
        tabTextList={tabList.map(tab => tab.display)}
        onClickTab={(index, tabText) => {}}
      />
      {loading ? (
        <View style={[styles.mt, styles.skeletonContainer]}>
          {Array.from({ length: 4 }).map((_, i) => (
            <PerformanceInfoSkeleton key={i} />
          ))}
        </View>
      ) : (
        <View />
        // <FlatList
        //   style={styles.mt}
        //   contentContainerStyle={styles.listContainer}
        //   horizontal
        //   showsHorizontalScrollIndicator={false}
        //   data={myAreaList}
        //   renderItem={({ item }) => (
        //     <PerformanceInfoContent item={item} onClick={onClickProduct} />
        //   )}
        //   keyExtractor={(item, index) => item.id ?? String(index)}
        // />
      )}
    </View>
  );
}

export default MonthRankContent;

const styles = StyleSheet.create({
  block: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 16,
    marginBottom: 10,
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
