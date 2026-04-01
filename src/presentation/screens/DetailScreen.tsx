import { KOKOR_CLIENT_ID } from '@env';
import React, { useCallback, useEffect } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import InfoContent from '../components/detail/InfoContent';
import PerformanceDetailCastContent from '../components/detail/PerformanceDetailCastContent';
import PerformanceDetailNoticeContent from '../components/detail/PerformanceDetailNoticeContent';
import PerformanceDetailPlaceContent from '../components/detail/PerformanceDetailPlaceContent';
import PerformanceDetailPriceContent from '../components/detail/PerformanceDetailPriceContent';
import PerformanceDetailTimeTableContent from '../components/detail/PerformanceDetailTimeTableContent';
import PosterContent from '../components/detail/PosterContent';
import IconHeader from '../components/IconHeader';
import IndicatorProgress from '../components/IndicatorProgress';
import { usePerformanceDetail } from '../hooks/usePerformanceDetail';
import { usePlaceDetail } from '../hooks/usePlaceDetail';
import { RootStackScreenProps } from './stack/RootStack';
import { RootContainer } from '../components/RootContainer';
import FloatingButton from '../components/detail/FloatingButton';

type Props = RootStackScreenProps<'Detail'>;

function DetailScreen({ navigation, route }: Props) {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const safeBottom = Platform.OS === 'ios' ? bottomInset : 0;
  const { performanceDetail, loading, error, callPerformanceDetailApi } =
    usePerformanceDetail();

  const {
    placeDetail,
    loading: placeLoading,
    error: placeError,
    callPlaceDetailApi,
  } = usePlaceDetail();

  const fetchPerformanceDetail = useCallback(
    (id: string) => {
      callPerformanceDetailApi({
        servicekey: KOKOR_CLIENT_ID,
        id: id,
      });
    },
    [callPerformanceDetailApi],
  );

  const fetchPlaceDetail = useCallback(
    (keyword: string) => {
      callPlaceDetailApi({
        servicekey: KOKOR_CLIENT_ID,
        currentPage: '1',
        rowsPerPage: '50',
        keyword: keyword,
      });
    },
    [callPlaceDetailApi],
  );

  useEffect(() => {
    const { performanceId } = route.params;
    fetchPerformanceDetail(performanceId);
  }, [route.params]);

  useEffect(() => {
    const name = performanceDetail?.facilityName?.split(' ')?.[0];

    console.log(`placeName = ${name}`);

    if (name) {
      fetchPlaceDetail(name);
    }
  }, [performanceDetail?.facilityName, fetchPlaceDetail]);

  useEffect(() => {
    if (error) {
      Alert.alert('오류', error ?? '알 수 없는 오류가 발생했습니다.');
    }
  }, [error]);

  return (
    <RootContainer
      topBar={
        <IconHeader
          title={performanceDetail?.name ?? '공연 상세'}
          onClick={() => navigation.goBack()}
        />
      }
      bottomBar={
        // <View style={[styles.floatingBottom]}>
        //   <View></View>
        // </View>
        <FloatingButton
          viewStyle={styles.floatingBottom}
          onClick={() => {}}
          isBookMark={true}
        />
      }
    >
      {loading ? (
        <IndicatorProgress />
      ) : (
        <View style={styles.body}>
          <ScrollView
            style={styles.content}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: 80 + safeBottom },
            ]}
          >
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
            <PerformanceDetailPlaceContent placeDetail={placeDetail} />
            <PerformanceDetailNoticeContent
              imageUrlList={performanceDetail?.imageUrlList ?? null}
            />
          </ScrollView>
        </View>
      )}
    </RootContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    flex: 1,
  },
  content: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  floatingBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  floatingButton: {
    flex: 7,
    backgroundColor: '#FF8224FF',
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
