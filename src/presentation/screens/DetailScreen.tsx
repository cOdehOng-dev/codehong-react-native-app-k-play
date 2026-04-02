import { KOKOR_CLIENT_ID } from '@env';
import React, { useCallback, useEffect, useState } from 'react';
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
import { useBookmark } from '../hooks/useBookmark';
import { RootStackScreenProps } from './stack/RootStack';
import { RootContainer } from '../components/RootContainer';
import FloatingButton from '../components/detail/FloatingButton';
import { Picker } from '../components/Picker';
import { openInAppBrowser } from '../utils';

type Props = RootStackScreenProps<'Detail'>;

// async function openInAppBrowser(url: string) {
//   if (!url) return;
//   try {
//     if (await InAppBrowser.isAvailable()) {
//       if (Platform.OS === 'ios') {
//         await InAppBrowser.open(url, {
//           // iOS SFSafariViewController
//           dismissButtonStyle: 'close',
//           preferredBarTintColor: '#FFFFFF',
//           preferredControlTintColor: '#FF8224',
//           readerMode: false,
//           animated: true,
//           modalEnabled: true,
//         });
//       } else {
//         await InAppBrowser.open(url, {
//           // Android Custom Tabs
//           showTitle: true,
//           toolbarColor: '#FFFFFF',
//           secondaryToolbarColor: '#FF8224',
//           enableUrlBarHiding: true,
//           enableDefaultShare: true,
//           forceCloseOnRedirection: false,
//         });
//       }
//     } else {
//       // 인앱 브라우저를 지원하지 않는 기기는 외부 브라우저로 폴백
//       await InAppBrowser.openAuth(url, '');
//     }
//   } catch (e) {
//     Alert.alert('오류', '브라우저를 열 수 없습니다.');
//   }
// }

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

  const [pickerVisible, setPickerVisible] = useState(false);

  const { isBookmarked, saveBookmark, removeBookmark } = useBookmark(
    performanceDetail?.name,
  );

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
        <FloatingButton
          viewStyle={styles.floatingBottom}
          onClick={() => {
            const list = performanceDetail?.ticketSiteList;
            if (!list || list.length === 0) return;
            if (list.length > 1) {
              setPickerVisible(true);
            } else {
              openInAppBrowser(list[0]?.url ?? '');
            }
          }}
          isBookMark={isBookmarked}
          onBookmarkClick={() => {
            if (!performanceDetail) return;
            if (isBookmarked) {
              removeBookmark(performanceDetail.id ?? '');
            } else {
              saveBookmark({
                id: performanceDetail.id,
                name: performanceDetail.name,
                posterUrl: performanceDetail.posterUrl,
                startDate: performanceDetail.startDate,
                endDate: performanceDetail.endDate,
                facilityName: performanceDetail.facilityName,
              });
            }
          }}
        />
      }
    >
      <Picker
        visible={pickerVisible}
        title="예매처 선택"
        optionList={
          performanceDetail?.ticketSiteList?.map(site => site.name ?? '') ?? []
        }
        selectedOptionIndex={0}
        selectorColorHex="#FFF0E5"
        onDismiss={() => setPickerVisible(false)}
        onConfirm={selectOption => {
          openInAppBrowser(
            performanceDetail?.ticketSiteList?.[selectOption[0]]?.url ?? '',
          );
          setPickerVisible(false);
        }}
      />
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
