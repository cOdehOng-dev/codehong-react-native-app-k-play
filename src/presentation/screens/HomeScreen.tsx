import { KOKOR_CLIENT_ID } from '@env';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import {
  GenreCode,
  GenreCodeItem,
  genreCodeList,
} from '../../domain/type/GenreCode';
import { RankTab, RankTabItem, rankTabList } from '../../domain/type/RankTab';
import {
  nameToRegionCode,
  RegionCode,
  regionCodeList,
} from '../../domain/type/RegionCode';
import {
  getCurrentMonth,
  getCurrentMonthRange,
  getPreviousMonthFirstDay,
  getPreviousMonthLastDay,
} from '../../domain/util/dateUtil';
import {
  checkLocationPermission,
  getAddressFromCoords,
  getCurrentPosition,
  requestLocationPermission,
} from '../../domain/util/LocationUtil';
import GenreListContent from '../components/GenreListContent';
import TopBannerContent from '../components/TopBannerContent';
import GenreRankContent from '../components/GenreRankContent';
import MonthRankContent from '../components/MonthRankContent';
import MyAreaContent from '../components/MyAreaContent';
import TabPerformanceContent from '../components/TabPerformanceContent';
import { useFestivalList } from '../hooks/useFestivalList';
import { useGenreRankList } from '../hooks/useGenreRankList';
import { useLocalList } from '../hooks/useLocalList';
import { useMonthRankList } from '../hooks/useMonthRankList';
import { useMyAreaList } from '../hooks/useMyAreaList';

function HomeScreen() {
  const [currentMonth] = useState(getCurrentMonth(false));

  // region 내 지역 공연 리스트 ---
  const fetchRegionCodeFromLocation = useCallback(async (): Promise<string> => {
    const { latitude, longitude } = await getCurrentPosition();
    const address = await getAddressFromCoords(latitude, longitude);
    return nameToRegionCode(address.region1).code;
  }, []);
  const {
    result: myAreaList,
    loading: myAreaLoading,
    error: myAreaError,
    callApi: callMyAreaList,
  } = useMyAreaList();
  const [isMyAreaLoading, setIsMyAreaLoading] = useState(false);

  const fetchMyAreaList = useCallback(
    (signGuCode: string) => {
      const { startDate, endDate } = getCurrentMonthRange();
      callMyAreaList({
        service: KOKOR_CLIENT_ID,
        startDate,
        endDate,
        currentPage: '1',
        rowsPerPage: '10',
        signGuCode,
      });
    },
    [callMyAreaList],
  );

  useEffect(() => {
    setIsMyAreaLoading(myAreaLoading);
  }, [myAreaLoading]);

  const handleRefresh = useCallback(async () => {
    setIsMyAreaLoading(true);
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('위치 권한 없음', '설정에서 위치 권한을 허용해주세요.');
      return;
    }
    try {
      const regionCode = await fetchRegionCodeFromLocation();
      fetchMyAreaList(regionCode);
    } catch {
      Alert.alert('오류', '현재 위치를 가져올 수 없습니다.');
    }
  }, [fetchMyAreaList, fetchRegionCodeFromLocation]);
  // endregion --------------------

  // region 월간 인기 순위 ---
  const {
    result: monthRankList,
    loading: monthRankLoading,
    error: monthRankError,
    callApi: callMonthRankList,
  } = useMonthRankList();
  const [isMonthRankListLoading, setIsMonthRankListLoading] = useState(false);
  const [selectedMonthRankTab, setSelectedMonthRankTab] = useState<RankTabItem>(
    RankTab.TOP_1_10,
  );
  const fetchMonthRank = useCallback(() => {
    const startDate = getPreviousMonthFirstDay('YYYYMMDD');
    const endDate = getPreviousMonthLastDay('YYYYMMDD');
    callMonthRankList({
      service: KOKOR_CLIENT_ID,
      startDate,
      endDate,
    });
  }, [callMonthRankList]);

  useEffect(() => {
    setIsMonthRankListLoading(monthRankLoading);
  }, [monthRankLoading]);
  // endregion --------------------

  // region 지역별 공연 리스트 ---
  const [entireLocalList, setEntireLocalList] = useState<
    Map<RegionCode, PerformanceInfoItem[]>
  >(new Map(regionCodeList.map(regionCode => [regionCode, []])));
  const [selectedLocalRegionCode, setSelectedLocalRegionCode] =
    useState<RegionCode>(RegionCode.SEOUL);
  const [isLocalListLoading, setLocalListLoading] = useState(false);

  const {
    result: localList,
    loading: localLoading,
    error: localError,
    callApi: callLocalListApi,
  } = useLocalList({
    entireLocalList,
    setEntireLocalList,
  });
  const fetchEntireLocalList = useCallback(
    (regionCode: RegionCode) => {
      const startDate = getPreviousMonthFirstDay('YYYYMMDD');
      const endDate = getPreviousMonthLastDay('YYYYMMDD');
      callLocalListApi({
        service: KOKOR_CLIENT_ID,
        startDate,
        endDate,
        currentPage: '1',
        rowsPerPage: '10',
        signGuCode: regionCode.code,
      });
    },
    [callLocalListApi],
  );
  useEffect(() => {
    setLocalListLoading(localLoading);
  }, [localLoading]);
  // endregion --------------------

  // region 축제 리스트 -------
  const [selectedFestivalRegionCode, setSelectedFestivalRegionCode] =
    useState<RegionCode>(RegionCode.SEOUL);

  const festivalListProps = useMemo(() => {
    const startDate = getPreviousMonthFirstDay('YYYYMMDD');
    const endDate = getPreviousMonthLastDay('YYYYMMDD');
    return {
      service: KOKOR_CLIENT_ID,
      startDate,
      endDate,
      currentPage: '1',
      rowsPerPage: '10',
      signGuCode: selectedFestivalRegionCode.code,
    };
  }, [selectedFestivalRegionCode]);

  const {
    result: festivalList,
    loading: isFestivalLoading,
    error: festivalError,
  } = useFestivalList({ props: festivalListProps });

  // endregion --------------------

  // regigon 장르별 순위 -------------
  const [entireGenreRankList, setEntireGenreRankList] = useState<
    Map<GenreCodeItem, BoxOfficeItem[]>
  >(new Map(genreCodeList.map(genreCode => [genreCode, []])));
  const [isGenreRankListLoading, setIsGenreRankListLoading] = useState(false);
  const [selectedGenreRankTab, setSelectedGenreRankTab] =
    useState<GenreCodeItem>(GenreCode.THEATER);
  const {
    result: genreRankList,
    loading: genreRankLoading,
    error: genreRankError,
    callApi: callGenreRankList,
  } = useGenreRankList({
    entireGenreRankList,
    setEntireGenreRankList,
  });

  const fetchGenreRank = useCallback(
    (genreCode: GenreCodeItem) => {
      const startDate = getPreviousMonthFirstDay('YYYYMMDD');
      const endDate = getPreviousMonthLastDay('YYYYMMDD');
      callGenreRankList({
        service: KOKOR_CLIENT_ID,
        startDate,
        endDate,
        genreCode: genreCode.code,
      });
    },
    [callGenreRankList],
  );

  useEffect(() => {
    setIsGenreRankListLoading(genreRankLoading);
  }, [genreRankLoading]);

  // endregion --------------------

  /**
   * API 호출
   */
  useEffect(() => {
    (async () => {
      try {
        const hasPermission = await checkLocationPermission();
        const regionCode = hasPermission
          ? await fetchRegionCodeFromLocation()
          : RegionCode.SEOUL.code;
        fetchMyAreaList(regionCode);
      } catch {
        fetchMyAreaList(RegionCode.SEOUL.code);
      }
    })();
    fetchMonthRank();
    fetchEntireLocalList(selectedLocalRegionCode);
    // 수정: fetchFestivalList 제거 - useQuery가 마운트 시 자동으로 첫 요청 처리
    fetchGenreRank(selectedGenreRankTab);
  }, []);

  return (
    <SafeAreaView style={styles.block} edges={['top']}>
      <ScrollView>
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
          currentMonth={currentMonth}
          myAreaList={myAreaList}
          loading={isMyAreaLoading}
          onClickRefresh={handleRefresh}
        />
        <MonthRankContent
          currentMonth={currentMonth}
          loading={isMonthRankListLoading}
          tabList={rankTabList}
          rankList={monthRankList}
          selectedTab={selectedMonthRankTab}
          onSelectTab={tab => {
            console.log(`선택한 탭 = ${tab.display}`);
            setSelectedMonthRankTab(tab);
          }}
        />
        <TabPerformanceContent
          title="지역별 공연이에요"
          tabList={regionCodeList}
          performanceList={localList}
          selectedTab={selectedLocalRegionCode}
          loading={isLocalListLoading}
          onClickMore={() => {}}
          onSelectedTab={tab => {
            console.log(`선택한 탭 = ${tab.displayName}`);
            setSelectedLocalRegionCode(tab);
            fetchEntireLocalList(tab);
          }}
        />
        <GenreRankContent
          title="장르별 순위에요"
          tabList={genreCodeList}
          selectedTab={selectedGenreRankTab}
          genreRankList={genreRankList}
          loading={isGenreRankListLoading}
          onSelectedTab={tab => {
            console.log(`선택한 탭 = ${tab.displayName}`);
            setSelectedGenreRankTab(tab);
            fetchGenreRank(tab);
          }}
          onClickMore={() => {}}
        />
        <TabPerformanceContent
          title="축제 공연은 어때요?"
          tabList={regionCodeList}
          performanceList={festivalList}
          selectedTab={selectedFestivalRegionCode}
          loading={isFestivalLoading}
          onClickMore={() => {}}
          onSelectedTab={tab => {
            // 수정: fetchFestivalList 호출 제거
            //       setSelectedFestivalRegionCode → festivalListProps 재계산 → useQuery 자동 재요청
            setSelectedFestivalRegionCode(tab);
          }}
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
