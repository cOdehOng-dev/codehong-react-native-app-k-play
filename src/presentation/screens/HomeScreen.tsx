import React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GenreCodeItem, genreCodeList } from '../../domain/type/genreCode';
import { RankTabItem, rankTabList } from '../../domain/type/rankTab';
import { RegionCode, regionCodeList } from '../../domain/type/regionCode';
import { DateUtil } from '../../domain/util/dateUtil';
import GenreListContent from '../components/GenreListContent';
import GenreRankContent from '../components/GenreRankContent';
import HomeSearchBar from '../components/HomeSearchBar';
import MonthRankContent from '../components/MonthRankContent';
import MyAreaContent from '../components/MyAreaContent';
import TabPerformanceContent from '../components/TabPerformanceContent';
import TopBannerContent from '../components/TopBannerContent';
import { useHomeViewModel } from '../mvi/home/useHomeViewModel';

function HomeScreen() {
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
      <ScrollView>
        <HomeSearchBar />
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
          currentMonth={DateUtil.getCurrentMonth(false)}
          myAreaList={myAreaList}
          isLoading={state.isMyAreaLoading}
          onClickRefresh={handleRefresh}
        />
        <MonthRankContent
          currentMonth={DateUtil.getCurrentMonth(false)}
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
});

export default HomeScreen;
