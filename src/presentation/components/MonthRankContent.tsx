import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import { RankTabItem } from '../../domain/type/rankTab';
import { RootStackNavigationProp } from '../screens/stack/RootStack';
import RankPerformanceInfoContent from './RankPerformanceInfoContent';
import ScrollTab from './ScrollTab';
import PerformanceInfoSkeleton from './skeleton/PerformanceInfoSkeleton';

type Props = {
  currentMonth: string;
  loading: boolean;
  tabList: RankTabItem[];
  selectedTab: RankTabItem;
  rankList: BoxOfficeItem[];
  onSelectTab: (tab: RankTabItem) => void;
};
function MonthRankContent({
  currentMonth,
  loading,
  tabList,
  selectedTab,
  rankList,
  onSelectTab,
}: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const selectedIndex = Math.max(tabList.indexOf(selectedTab), 0);
  const dispRankList = rankList.filter((item, index) => {
    const rank = parseInt(item.rank ?? '0', 10);
    return rank >= selectedTab.startRank && rank <= selectedTab.endRank;
  });
  return (
    <View style={styles.block}>
      <Text style={styles.title}>{currentMonth}월 인기 순위 Top50</Text>
      <ScrollTab
        initialSelectIndex={selectedIndex}
        tabList={tabList}
        tabTextList={tabList.map(tab => tab.display)}
        onClickTab={(index, tabText) => {
          onSelectTab(tabList[index]);
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
          data={dispRankList}
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

export default MonthRankContent;
