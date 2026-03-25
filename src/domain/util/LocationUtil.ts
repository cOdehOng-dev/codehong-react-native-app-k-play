import { KAKAO_REST_API_KEY } from '@env';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

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
    const status = await Geolocation.requestAuthorization('whenInUse');
    return status === 'granted';
  }
  const granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  return granted;
};

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const result = await Geolocation.requestAuthorization('whenInUse');
    return result === 'granted';
  }
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
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
