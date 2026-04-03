import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ArrowTitleContent from './ArrowTitleContent';
import { RegionCode } from '../../domain/type/regionCode';
import ScrollTab from './ScrollTab';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import PerformanceInfoContent from './PerformanceInfoContent';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../screens/stack/RootStack';
import PerformanceInfoSkeleton from './skeleton/PerformanceInfoSkeleton';

type Props = {
  title: string;
  tabList: RegionCode[];
  selectedTab: RegionCode;
  performanceList?: PerformanceInfoItem[];
  loading: boolean;
  onSelectedTab: (tab: RegionCode) => void;
  onClickMore: () => void;
};

function TabPerformanceContent({
  title,
  tabList,
  performanceList,
  selectedTab,
  loading,
  onClickMore,
  onSelectedTab: onSelectTab,
}: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const selectedIndex = Math.max(tabList.indexOf(selectedTab), 0);
  return (
    <View style={styles.root}>
      <ArrowTitleContent title={title} onClickMore={onClickMore} />
      <ScrollTab
        initialSelectIndex={selectedIndex}
        tabList={tabList}
        tabTextList={tabList.map(tab => tab.displayName)}
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
          data={performanceList}
          renderItem={({ item }) => (
            <PerformanceInfoContent
              item={item}
              onClick={() =>
                navigation.navigate('Detail', { performanceId: item.id ?? '' })
              }
            />
          )}
          keyExtractor={(item, index) => item.id ?? String(index)}
        />
      )}
    </View>
  );
}
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

export default TabPerformanceContent;
