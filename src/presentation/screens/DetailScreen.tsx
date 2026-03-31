import React, { useCallback, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import IconHeader from '../components/IconHeader';
import { RootStackScreenProps } from './stack/RootStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import IndicatorProgress from '../components/IndicatorProgress';
import { usePerformanceDetail } from '../hooks/usePerformanceDetail';
import { KOKOR_CLIENT_ID } from '@env';
import PosterContent from '../components/detail/PosterContent';
import InfoContent from '../components/detail/InfoContent';
import PerformanceDetailCastContent from '../components/detail/PerformanceDetailCastContent';
import PerformanceDetailTimeTableContent from '../components/detail/PerformanceDetailTimeTableContent';
import PerformanceDetailPriceContent from '../components/detail/PerformanceDetailPriceContent';

type Props = RootStackScreenProps<'Detail'>;

function DetailScreen({ navigation, route }: Props) {
  const { performanceDetail, loading, error, callPerformanceDetailApi } =
    usePerformanceDetail();

  const fetchPerformanceDetail = useCallback(
    (id: string) => {
      callPerformanceDetailApi({
        servicekey: KOKOR_CLIENT_ID,
        id: id,
      });
    },
    [callPerformanceDetailApi],
  );

  useEffect(() => {
    const { performanceId } = route.params;
    fetchPerformanceDetail(performanceId);
  }, [route.params]);

  useEffect(() => {
    if (error) {
      Alert.alert('오류', error ?? '알 수 없는 오류가 발생했습니다.');
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.container}>
      <IconHeader
        title={performanceDetail?.name ?? '공연 상세'}
        onClick={() => navigation.goBack()}
      />
      {loading ? (
        <IndicatorProgress />
      ) : (
        <ScrollView style={styles.content}>
          <PosterContent imageInfo={performanceDetail?.posterUrl ?? null} />
          {performanceDetail?.name && (
            <Text style={styles.title} numberOfLines={1}>
              {performanceDetail.name}
            </Text>
          )}
          <InfoContent detail={performanceDetail} />
          <PerformanceDetailCastContent
            castInfo={performanceDetail?.cast ?? null}
            crewInfo={performanceDetail?.crew ?? null}
          />
          <PerformanceDetailTimeTableContent
            timeTable={performanceDetail?.dateGuidance ?? null}
          />
          <PerformanceDetailPriceContent
            priceInfo={performanceDetail?.priceInfo ?? null}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  title: {
    marginTop: 20,
    marginBottom: 16,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 16,
  },
});

export default DetailScreen;
