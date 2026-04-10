import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import CalendarModal from '../components/calendar/CalendarModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GenreCodeItem, genreCodeList } from '../../domain/type/genreCode';
import { RankTabItem, rankTabList } from '../../domain/type/rankTab';
import { RegionCode, regionCodeList } from '../../domain/type/regionCode';
import { getCurrentMonth } from '../../domain/util/dateUtil';
import GenreListContent from '../components/GenreListContent';
import GenreRankContent from '../components/GenreRankContent';
import MonthRankContent from '../components/MonthRankContent';
import MyAreaContent from '../components/MyAreaContent';
import TabPerformanceContent from '../components/TabPerformanceContent';
import TopBannerContent from '../components/TopBannerContent';
import { useHomeViewModel } from '../mvi/home/useHomeViewModel';
import HomeSearchBar from '../components/HomeSearchBar';

function HomeScreen() {
  const [calendarVisible, setCalendarVisible] = useState(false);

  const {
    state,
    onAction,
    handleRefresh,
    myAreaList,
    monthRankList,
    localList,
    festivalList,
    genreRankList,
    isMonthRankListLoading,
    isLocalListLoading,
    isFestivalLoading,
    isGenreRankListLoading,
  } = useHomeViewModel();

  return (
    <SafeAreaView style={styles.block} edges={['top']}>
      <CalendarModal
        visible={calendarVisible}
        onConfirm={(start, end) => {
          console.log('선택된 날짜:', start, end);
        }}
        onDismiss={() => setCalendarVisible(false)}
      />
      <ScrollView>
        <HomeSearchBar />
        <Pressable
          style={styles.testButton}
          onPress={() => setCalendarVisible(true)}
        >
          <Text style={styles.testButtonText}>캘린더 테스트</Text>
        </Pressable>
        <TopBannerContent
          isLoading={isMonthRankListLoading}
          bannerList={monthRankList.slice(0, 6)}
        />
        <GenreListContent
          genreList={genreCodeList}
          onClickGenre={(genreCode: GenreCodeItem) =>
            Alert.alert('장르 선택', `선택한 장르: ${genreCode.displayName}`)
          }
        />
        <MyAreaContent
          currentMonth={getCurrentMonth(false)}
          myAreaList={myAreaList}
          isLoading={state.isMyAreaLoading}
          onClickRefresh={handleRefresh}
        />
        <MonthRankContent
          currentMonth={getCurrentMonth(false)}
          isLoading={isMonthRankListLoading}
          tabList={rankTabList}
          rankList={monthRankList}
          selectedTab={state.selectedMonthRankTab}
          onSelectTab={(tab: RankTabItem) =>
            onAction({ type: 'SELECT_MONTH_RANK_TAB', tab })
          }
        />
        <TabPerformanceContent
          title="지역별 공연이에요"
          tabList={regionCodeList}
          performanceList={localList}
          selectedTab={state.selectedLocalTab}
          isLoading={isLocalListLoading}
          onSelectTab={(tab: RegionCode) =>
            onAction({ type: 'SELECT_LOCAL_REGION', region: tab })
          }
          onClickMore={() => {}}
        />
        <GenreRankContent
          title="장르별 순위에요"
          tabList={genreCodeList}
          selectedTab={state.selectedGenreRankTab}
          genreRankList={genreRankList}
          isLoading={isGenreRankListLoading}
          onSelectTab={(tab: GenreCodeItem) =>
            onAction({ type: 'SELECT_GENRE_RANK_TAB', genre: tab })
          }
          onClickMore={() => {}}
        />
        <TabPerformanceContent
          title="축제 공연은 어때요?"
          tabList={regionCodeList}
          performanceList={festivalList}
          selectedTab={state.selectedFestivalTab}
          isLoading={isFestivalLoading}
          onSelectTab={(tab: RegionCode) =>
            onAction({ type: 'SELECT_FESTIVAL_REGION', region: tab })
          }
          onClickMore={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  testButton: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    backgroundColor: '#FF8224',
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
