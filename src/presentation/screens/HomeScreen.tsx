import { KOKOR_CLIENT_ID } from '@env';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GenreCodeItem, GenreCodes } from '../../domain/type/GenreCode';
import { RankTab, RankTabItem, RankTabList } from '../../domain/type/RankTab';
import { nameToRegionCode, RegionCode } from '../../domain/type/RegionCode';
import {
  getCurrentMonth,
  getCurrentMonthRange,
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
import { useBoxOfficeList } from '../hooks/useBoxOfficeList';
import { usePerformanceList } from '../hooks/usePerformanceList';

function HomeScreen() {
  const [currentMonth] = useState(getCurrentMonth(false));

  const { performanceList, loading, error, callPerformanceListApi } =
    usePerformanceList();
  const [isMyAreaLoading, setIsMyAreaLoading] = useState(false);

  const {
    boxofficeList,
    isLoading: isBoxOfficeLoading,
    error: boxOfficeError,
    callBoxofficeList,
  } = useBoxOfficeList();
  const [isBoxOfficeDataLoading, setIsBoxOfficeDataLoading] = useState(false);
  const [selectedMonthRankTab, setSelectedMonthRankTab] = useState<RankTabItem>(
    RankTab.TOP_1_10,
  );

  const genreTabList = GenreCodes;
  const tabList = RankTabList;

  const fetchMyAreaPerformance = useCallback(
    (signGuCode: string) => {
      const { startDate, endDate } = getCurrentMonthRange();
      callPerformanceListApi({
        service: KOKOR_CLIENT_ID,
        startDate,
        endDate,
        currentPage: '1',
        rowsPerPage: '10',
        signGuCode,
      });
    },
    [callPerformanceListApi],
  );

  const getRegionCodeFromLocation = useCallback(async (): Promise<string> => {
    const { latitude, longitude } = await getCurrentPosition();
    const address = await getAddressFromCoords(latitude, longitude);
    return nameToRegionCode(address.region1).code;
  }, []);

  const fetchMonthRank = useCallback(() => {
    const { startDate, endDate } = getCurrentMonthRange();
    callBoxofficeList({
      service: KOKOR_CLIENT_ID,
      startDate,
      endDate,
    });
  }, [callBoxofficeList]);

  useEffect(() => {
    (async () => {
      try {
        const hasPermission = await checkLocationPermission();
        const regionCode = hasPermission
          ? await getRegionCodeFromLocation()
          : RegionCode.SEOUL.code;
        fetchMyAreaPerformance(regionCode);
      } catch {
        fetchMyAreaPerformance(RegionCode.SEOUL.code);
      }
    })();
    fetchMonthRank();
  }, []);

  useEffect(() => {
    setIsMyAreaLoading(loading);
  }, [loading]);

  useEffect(() => {
    setIsBoxOfficeDataLoading(isBoxOfficeLoading);
  }, [isBoxOfficeLoading]);

  const handleRefresh = useCallback(async () => {
    setIsMyAreaLoading(true);
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('위치 권한 없음', '설정에서 위치 권한을 허용해주세요.');
      return;
    }
    try {
      const regionCode = await getRegionCodeFromLocation();
      fetchMyAreaPerformance(regionCode);
    } catch {
      Alert.alert('오류', '현재 위치를 가져올 수 없습니다.');
    }
  }, [fetchMyAreaPerformance, getRegionCodeFromLocation]);

  return (
    <SafeAreaView style={styles.block} edges={['top']}>
      <ScrollView>
        <GenreListContent
          genreList={genreTabList}
          onClickGenre={(genreCode: GenreCodeItem) =>
            Alert.alert('장르 선택', `선택한 장르: ${genreCode.displayName}`)
          }
        />
        <MyAreaContent
          currentMonth={currentMonth}
          myAreaList={performanceList}
          loading={isMyAreaLoading}
          onClickRefresh={handleRefresh}
        />
        <MonthRankContent
          currentMonth={currentMonth}
          loading={isBoxOfficeDataLoading}
          tabList={tabList}
          rankList={boxofficeList}
          selectedTab={selectedMonthRankTab}
          onSelectTab={tab => {
            console.log(`선택한 탭 = ${tab.display}`);
            setSelectedMonthRankTab(tab);
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
