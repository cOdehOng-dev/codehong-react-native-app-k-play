import { KAKAO_REST_API_KEY } from '@env';
import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  check,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

interface KakaoRegionDocument {
  region_type: string;
  code: string;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  x: number;
  y: number;
}

interface KakaoCoord2RegionResponse {
  meta: { total_count: number };
  documents: KakaoRegionDocument[];
}

export interface Address {
  region1: string; // 시/도
  region2: string; // 시/군/구
  region3: string; // 읍/면/동
}

// TODO : 클린 아키텍처로 수정하기
export async function getAddressFromCoords(
  latitude: number,
  longitude: number,
): Promise<Address> {
  const response = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
    {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  );

  if (!response.ok) {
    throw new Error('주소를 가져오지 못했습니다.');
  }

  const json = (await response.json()) as KakaoCoord2RegionResponse;
  console.log('[LocationUtil] 응답:', JSON.stringify(json, null, 2));
  const region = json.documents?.[0];
  console.log('[LocationUtil] region:', JSON.stringify(region, null, 2));

  if (!region) {
    throw new Error('주소 정보가 없습니다.');
  }

  return {
    region1: region.region_1depth_name,
    region2: region.region_2depth_name,
    region3: region.region_3depth_name,
  };
}

export const checkLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    return result === RESULTS.GRANTED;
  }
  // FINE이 있으면 FINE, 없으면 COARSE라도 있으면 허용
  const fine = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  if (fine === RESULTS.GRANTED) return true;
  const coarse = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
  return coarse === RESULTS.GRANTED;
};

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    return result === RESULTS.GRANTED;
  }
  // Android 12+: COARSE + FINE 동시 요청 → 통합 다이얼로그(정밀/대략) 표시
  // 단독 요청 시 정밀도 선택이 별도 Activity로 뜨며 크래시 발생
  const results = await requestMultiple([
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ]);
  return (
    results[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED ||
    results[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED
  );
};

export const getCurrentPosition = (): Promise<{
  latitude: number;
  longitude: number;
}> =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position.coords),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  });
