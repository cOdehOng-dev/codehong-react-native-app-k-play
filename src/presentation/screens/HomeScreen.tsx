import { Alert, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePerformanceList } from '../hooks/usePerformanceList';
import { KOKOR_CLIENT_ID } from '@env';
import MyAreaContent from '../components/MyAreaContent';
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
import { nameToRegionCode, RegionCode } from '../../domain/type/RegionCode';
import {
  GenreCode,
  GenreCodeItem,
  GenreCodes,
} from '../../domain/type/GenreCode';
import GenreListContent from '../components/GenreListContent';

function HomeScreen() {
  const [currentMonth] = useState(getCurrentMonth(false));
  const { performanceList, loading, error, callPerformanceListApi } =
    usePerformanceList();
  const [isLoading, setIsLoading] = useState(false);
  const genreTabList = GenreCodes;

  const fetchPerformances = useCallback(
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

  useEffect(() => {
    (async () => {
      try {
        const hasPermission = await checkLocationPermission();
        const regionCode = hasPermission
          ? await getRegionCodeFromLocation()
          : RegionCode.SEOUL.code;
        fetchPerformances(regionCode);
      } catch {
        fetchPerformances(RegionCode.SEOUL.code);
      }
    })();
  }, []);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('위치 권한 없음', '설정에서 위치 권한을 허용해주세요.');
      return;
    }
    try {
      const regionCode = await getRegionCodeFromLocation();
      fetchPerformances(regionCode);
    } catch {
      Alert.alert('오류', '현재 위치를 가져올 수 없습니다.');
    }
  }, [fetchPerformances, getRegionCodeFromLocation]);

  return (
    <SafeAreaView style={styles.block}>
      <GenreListContent
        genreList={genreTabList}
        onClickGenre={(genreCode: GenreCodeItem) =>
          Alert.alert('장르 선택', `선택한 장르: ${genreCode.displayName}`)
        }
      />
      <MyAreaContent
        currentMonth={currentMonth}
        myAreaList={performanceList}
        loading={isLoading}
        onClickRefresh={handleRefresh}
      />
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
