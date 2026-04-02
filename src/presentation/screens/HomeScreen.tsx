import { KOKOR_CLIENT_ID } from '@env';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GenreCodeItem, genreCodeList } from '../../domain/type/GenreCode';
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
import MonthRankContent from '../components/MonthRankContent';
import MyAreaContent from '../components/MyAreaContent';
import TabPerformanceContent from '../components/TabPerformanceContent';
import { useBoxofficeList } from '../hooks/useBoxOfficeList';
import { useMyAreaList } from '../hooks/useMyAreaList';
import { useFestivalList } from '../hooks/useFestivalList';

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
    result: boxofficeList,
    loading: boxofficeLoading,
    error: boxofficeError,
    callApi: callMonthRankList,
  } = useBoxofficeList();
  const [isBoxofficeDataLoading, setIsBoxofficeDataLoading] = useState(false);
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
    setIsBoxofficeDataLoading(boxofficeLoading);
  }, [boxofficeLoading]);
  // endregion --------------------

  // region 지역별 공연 리스트 ---
  const [selectedAllRegionCode, setSelectedAllRegionCode] =
    useState<RegionCode>(RegionCode.SEOUL);
  const [isEntireLocalLoading, setIsEntireLocalLoading] = useState(false);

  const {
    result: entireLocalList,
    loading: localLoading,
    error: localError,
    callApi: callEntireLocalListApi,
  } = useMyAreaList();
  const fetchEntireLocalList = useCallback(
    (regionCode: RegionCode) => {
      const startDate = getPreviousMonthFirstDay('YYYYMMDD');
      const endDate = getPreviousMonthLastDay('YYYYMMDD');
      callEntireLocalListApi({
        service: KOKOR_CLIENT_ID,
        startDate,
        endDate,
        currentPage: '1',
        rowsPerPage: '10',
        signGuCode: regionCode.code,
      });
    },
    [callEntireLocalListApi],
  );
  useEffect(() => {
    setIsEntireLocalLoading(localLoading);
  }, [localLoading]);
  // endregion --------------------

  // region 축제 리스트 ---
  const [selectedFestivalRegionCode, setSelectedFestivalRegionCode] =
    useState<RegionCode>(RegionCode.SEOUL);
  const [isFestivalLoading, setIsFestivalLoading] = useState(false);

  const {
    result: festivalList,
    loading: festivalLoading,
    error: festivalError,
    callApi: callFestivalListApi,
  } = useFestivalList();

  const fetchFestivalList = useCallback(
    (regionCode: RegionCode) => {
      const startDate = getPreviousMonthFirstDay('YYYYMMDD');
      const endDate = getPreviousMonthLastDay('YYYYMMDD');
      callFestivalListApi({
        service: KOKOR_CLIENT_ID,
        startDate,
        endDate,
        currentPage: '1',
        rowsPerPage: '10',
        signGuCode: regionCode.code,
      });
    },
    [callFestivalListApi],
  );
  useEffect(() => {
    setIsFestivalLoading(festivalLoading);
  }, [festivalLoading]);
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
    fetchEntireLocalList(selectedAllRegionCode);
    fetchFestivalList(selectedFestivalRegionCode);
  }, []);

  return (
    <SafeAreaView style={styles.block} edges={['top']}>
      <ScrollView>
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
          loading={isBoxofficeDataLoading}
          tabList={rankTabList}
          rankList={boxofficeList}
          selectedTab={selectedMonthRankTab}
          onSelectTab={tab => {
            console.log(`선택한 탭 = ${tab.display}`);
            setSelectedMonthRankTab(tab);
          }}
        />
        <TabPerformanceContent
          title="지역별 공연이에요"
          tabList={regionCodeList}
          performanceList={entireLocalList}
          selectedTab={selectedAllRegionCode}
          loading={isEntireLocalLoading}
          onClickMore={() => {}}
          onSelectTab={tab => {
            console.log(`선택한 탭 = ${tab.displayName}`);
            setSelectedAllRegionCode(tab);
            fetchEntireLocalList(tab);
          }}
        />
        <TabPerformanceContent
          title="축제 공연은 어때요?"
          tabList={regionCodeList}
          performanceList={festivalList}
          selectedTab={selectedFestivalRegionCode}
          loading={isFestivalLoading}
          onClickMore={() => {}}
          onSelectTab={tab => {
            setSelectedFestivalRegionCode(tab);
            fetchFestivalList(tab);
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
