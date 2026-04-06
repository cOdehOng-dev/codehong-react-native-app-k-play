import { KOKOR_CLIENT_ID } from '@env';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GenreCode,
  GenreCodeItem,
  genreCodeList,
} from '../../domain/type/genreCode';
import { RankTab, RankTabItem, rankTabList } from '../../domain/type/rankTab';
import {
  nameToRegionCode,
  RegionCode,
  regionCodeList,
} from '../../domain/type/regionCode';
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
import GenreRankContent from '../components/GenreRankContent';
import MonthRankContent from '../components/MonthRankContent';
import MyAreaContent from '../components/MyAreaContent';
import TabPerformanceContent from '../components/TabPerformanceContent';
import TopBannerContent from '../components/TopBannerContent';
import { useFestivalList } from '../hooks/useFestivalList';
import { useGenreRankList } from '../hooks/useGenreRankList';
import { useLocalList } from '../hooks/useLocalList';
import { useMonthRankList } from '../hooks/useMonthRankList';
import { useMyAreaList } from '../hooks/useMyAreaList';
import useMyRegionActions from '../hooks/useMyRegionActions';

function HomeScreen() {
  const [currentMonth] = useState(getCurrentMonth(false));
  const { save } = useMyRegionActions();

  // region 내 지역 공연 리스트 ---------------------------
  const fetchRegionCodeFromLocation = useCallback(async (): Promise<string> => {
    const { latitude, longitude } = await getCurrentPosition();
    const address = await getAddressFromCoords(latitude, longitude);
    console.log(`test here address = ${JSON.stringify(address)}`);
    save({
      address,
      regionCode: nameToRegionCode(address.region1),
    });
    return nameToRegionCode(address.region1).code;
  }, []);

  const [myAreaSignGuCode, setMyAreaSignGuCode] = useState<string>(
    RegionCode.SEOUL.code,
  );

  const fetchMyAreaListProps = useMemo(() => {
    const { startDate, endDate } = getCurrentMonthRange();
    return {
      service: KOKOR_CLIENT_ID,
      startDate,
      endDate,
      currentPage: '1',
      rowsPerPage: '10',
      signGuCode: myAreaSignGuCode,
    };
  }, [myAreaSignGuCode]);

  const {
    result: myAreaList,
    loading: isLoadignMyAreaList,
    error: errorMyAreaList,
    refetch: refetchMyAreaList,
  } = useMyAreaList({ props: fetchMyAreaListProps });

  const [isMyAreaLoading, setIsMyAreaLoading] = useState(false);

  useEffect(() => {
    setIsMyAreaLoading(isLoadignMyAreaList);
  }, [isLoadignMyAreaList]);

  const handleRefresh = useCallback(async () => {
    setIsMyAreaLoading(true);
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('위치 권한 없음', '설정에서 위치 권한을 허용해주세요.');
      setIsMyAreaLoading(false);
      return;
    }
    try {
      const regionCode = await fetchRegionCodeFromLocation();
      if (regionCode === myAreaSignGuCode) {
        refetchMyAreaList();
      } else {
        setMyAreaSignGuCode(regionCode);
      }
    } catch {
      Alert.alert('오류', '현재 위치를 가져올 수 없습니다.');
      setIsMyAreaLoading(false);
    }
  }, [myAreaSignGuCode, fetchRegionCodeFromLocation, refetchMyAreaList]);
  // endregion --------------------

  // region 월간 인기 순위 ---
  const [selectedMonthRankTab, setSelectedMonthRankTab] = useState<RankTabItem>(
    RankTab.TOP_1_10,
  );
  const fetchMonthRankListProps = useMemo(() => {
    const startDate = getPreviousMonthFirstDay('YYYYMMDD');
    const endDate = getPreviousMonthLastDay('YYYYMMDD');

    return {
      service: KOKOR_CLIENT_ID,
      startDate,
      endDate,
    };
  }, [selectedMonthRankTab]);

  const {
    result: monthRankList,
    loading: isMonthRankListLoading,
    error: monthRankError,
  } = useMonthRankList({ props: fetchMonthRankListProps });

  // endregion --------------------

  // region 지역별 공연 리스트 ---
  const [selectedLocalRegionCode, setSelectedLocalRegionCode] =
    useState<RegionCode>(RegionCode.SEOUL);

  const fetchLocalListProps = useMemo(() => {
    const startDate = getPreviousMonthFirstDay('YYYYMMDD');
    const endDate = getPreviousMonthLastDay('YYYYMMDD');

    return {
      service: KOKOR_CLIENT_ID,
      startDate,
      endDate,
      currentPage: '1',
      rowsPerPage: '10',
      signGuCode: selectedLocalRegionCode.code,
    };
  }, [selectedLocalRegionCode]);

  const {
    result: localList,
    loading: isLocalListLoading,
    error: localError,
  } = useLocalList({ props: fetchLocalListProps });
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
  const [selectedGenreRankTab, setSelectedGenreRankTab] =
    useState<GenreCodeItem>(GenreCode.THEATER);

  const genreRankListProps = useMemo(() => {
    const startDate = getPreviousMonthFirstDay('YYYYMMDD');
    const endDate = getPreviousMonthLastDay('YYYYMMDD');
    return {
      service: KOKOR_CLIENT_ID,
      startDate,
      endDate,
      genreCode: selectedGenreRankTab.code,
    };
  }, [selectedGenreRankTab]);

  const {
    result: genreRankList,
    loading: isGenreRankListLoading,
    error: genreRankError,
  } = useGenreRankList({
    props: genreRankListProps,
  });
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
        setMyAreaSignGuCode(regionCode);
      } catch {
        setMyAreaSignGuCode(RegionCode.SEOUL.code);
      }
    })();
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
            // fetchEntireLocalList(tab);
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
