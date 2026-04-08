import { KOKOR_CLIENT_ID } from '@env';
import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PerformanceGroup } from '../../domain/model/performanceGroup';
import { getCurrentMonthRange } from '../../domain/util/dateUtil';
import MapMarker from '../components/MapMarker';
import PerformanceModal from '../components/PerformanceModal';
import { useMyAreaList } from '../hooks/useMyAreaList';
import useMyRegion from '../hooks/useMyRegion';
import { useMyZoneList } from '../hooks/useMyZoneList';
import { RootStackNavigationProp } from './stack/RootStack';

function MyZoneScreen() {
  const { myRegion } = useMyRegion();
  const [selectedPin, setSelectedPin] = useState<PerformanceGroup | null>(null);
  const handleSelectPin = useCallback((pin: PerformanceGroup) => {
    setSelectedPin(pin);
  }, []);
  const loadingRef = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<RootStackNavigationProp>();

  const myZoneProps = useMemo(() => {
    const { startDate, endDate } = getCurrentMonthRange();
    return {
      service: KOKOR_CLIENT_ID,
      startDate,
      endDate,
      currentPage: '1',
      rowsPerPage: '100',
      signGuCode: myRegion?.regionCode?.code ?? '',
    };
  }, [myRegion?.regionCode?.code]);

  const { result: myAreaList } = useMyAreaList({ props: myZoneProps });

  const placeNameList = useMemo(
    () => (myAreaList ?? []).map(p => p?.placeName ?? ''),
    [myAreaList],
  );

  const { result: placeDetails, loading: isLoadingPlaceDetails } =
    useMyZoneList({ placeNameList });

  useEffect(() => {
    Animated.timing(loadingRef, {
      toValue: isLoadingPlaceDetails ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isLoadingPlaceDetails]);

  const pinList = useMemo<PerformanceGroup[]>(() => {
    if (!placeDetails || placeDetails.length === 0) {
      return [];
    }

    const result: PerformanceGroup[] = [];

    placeDetails.forEach(placeDetail => {
      if (result.find(p => p?.placeName === placeDetail?.placeName)) {
        return;
      }
      if (placeDetail?.latitude && placeDetail?.longitude) {
        const performanceList: PerformanceGroup['performanceList'] = [];

        myAreaList?.forEach(myArea => {
          if (myArea?.placeName === placeDetail?.placeName) {
            performanceList?.push(myArea);
          }
        });

        result.push({
          placeName: placeDetail?.placeName ?? '',
          lat: Number(placeDetail?.latitude),
          lng: Number(placeDetail?.longitude),
          performanceList,
        });
      }
    });

    return result;
  }, [placeDetails, myAreaList]);

  const initialCamera = useMemo(() => {
    const myLat = myRegion?.latitude;
    const myLng = myRegion?.longitude;

    if (!myLat || !myLng || pinList.length === 0) {
      return { latitude: myLat ?? 0, longitude: myLng ?? 0, zoom: 12 };
    }

    const closest = pinList.reduce((prev, curr) => {
      const prevDist =
        Math.pow((prev.lat ?? 0) - myLat, 2) +
        Math.pow((prev.lng ?? 0) - myLng, 2);
      const currDist =
        Math.pow((curr.lat ?? 0) - myLat, 2) +
        Math.pow((curr.lng ?? 0) - myLng, 2);
      return currDist < prevDist ? curr : prev;
    });

    return {
      latitude: closest.lat ?? 0,
      longitude: closest.lng ?? 0,
      zoom: 12,
    };
  }, [pinList, myRegion?.latitude, myRegion?.longitude]);

  return (
    <View style={styles.container}>
      <NaverMapView
        style={styles.container}
        initialCamera={initialCamera}
        isShowZoomControls={false}
      >
        {pinList.map(pin =>
          pin.lat && pin.lng ? (
            <MapMarker
              key={pin.placeName}
              pin={pin}
              onSelect={handleSelectPin}
            />
          ) : null,
        )}
      </NaverMapView>
      <Animated.View
        style={[styles.loadingContainer, { opacity: loadingRef }]}
        pointerEvents="none"
      >
        <View style={styles.loadingPill}>
          <ActivityIndicator size={16} color="#FF8224" />
          <Text style={styles.loadingText}>공연장 위치 조회 중...</Text>
        </View>
      </Animated.View>
      <PerformanceModal
        selectedPin={selectedPin}
        onClose={() => setSelectedPin(null)}
        onSelectPerformance={id => {
          navigation.navigate('Detail', {
            performanceId: id,
          });
          setSelectedPin(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loadingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  loadingText: {
    fontSize: 12,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  performanceItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  performanceName: {
    fontSize: 14,
    fontWeight: '600',
  },
  performancePeriod: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});

export default MyZoneScreen;
