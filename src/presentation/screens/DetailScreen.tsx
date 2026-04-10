import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FloatingButton from '../components/detail/FloatingButton';
import InfoContent from '../components/detail/InfoContent';
import PerformanceDetailCastContent from '../components/detail/PerformanceDetailCastContent';
import PerformanceDetailNoticeContent from '../components/detail/PerformanceDetailNoticeContent';
import PerformanceDetailPlaceContent from '../components/detail/PerformanceDetailPlaceContent';
import PerformanceDetailPriceContent from '../components/detail/PerformanceDetailPriceContent';
import PerformanceDetailTimeTableContent from '../components/detail/PerformanceDetailTimeTableContent';
import PosterContent from '../components/detail/PosterContent';
import IconHeader from '../components/IconHeader';
import IndicatorProgress from '../components/IndicatorProgress';
import { Picker } from '../components/Picker';
import { RootContainer } from '../components/RootContainer';
import { RootStackScreenProps } from './stack/RootStack';
import { useDetailViewModel } from '../mvi/detail/useDetailViewModel';
import { Utils } from '../utils';

type Props = RootStackScreenProps<'Detail'>;

function DetailScreen({ navigation, route }: Props) {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const safeBottom = Platform.OS === 'ios' ? bottomInset : 0;
  const [pickerVisible, setPickerVisible] = useState(false);

  const {
    state,
    onAction,
    performanceDetail,
    isLoadingPerformanceDetail,
    errorPerformanceDetail,
    isBookmarked,
    placeDetail,
    isLoadingPlaceDetail,
    errorPlaceDetail,
  } = useDetailViewModel();

  useEffect(() => {
    onAction({ type: 'SET_PERFORMANCE_ID', id: route.params.performanceId });
  }, [route.params.performanceId, onAction]);

  useEffect(() => {
    if (errorPerformanceDetail) {
      Alert.alert(
        '오류',
        errorPerformanceDetail ?? '알 수 없는 오류가 발생했습니다.',
      );
    }
  }, [errorPerformanceDetail]);

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
              Utils.openInAppBrowser(list[0]?.url ?? '');
            }
          }}
          isBookMark={isBookmarked}
          onBookmarkClick={() => {
            if (isBookmarked) {
              onAction({ type: 'REMOVE_BOOKMARK' });
            } else {
              onAction({ type: 'SAVE_BOOKMARK' });
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
          Utils.openInAppBrowser(
            performanceDetail?.ticketSiteList?.[selectOption[0]]?.url ?? '',
          );
          setPickerVisible(false);
        }}
      />
      {isLoadingPerformanceDetail || isLoadingPlaceDetail ? (
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
              <Text style={styles.title} numberOfLines={2}>
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
