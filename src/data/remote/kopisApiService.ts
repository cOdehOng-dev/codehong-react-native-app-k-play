import { BoxofficeProps } from '../../domain/model/apiprops/boxofficeProps';
import { PerformanceDetailProps } from '../../domain/model/apiprops/performanceDetailProps';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';
import { PlaceDetailProps } from '../../domain/model/apiprops/placeDetailProps';
import { kopisApi } from '../api/instance';
import {
  BoxofficeResponseDto,
  parseBoxofficeResponseDto,
} from '../model/boxoffice/boxofficeResponseDto';
import {
  parsePerformanceDetailResponseDto,
  PerformanceDetailResponseDto,
} from '../model/detail/performanceDetailResponseDto';
import {
  parsePerformanceListResponseDto,
  PerformanceListResponseDto,
} from '../model/performance/list/PerformanceListResponseDto';
import {
  parsePlaceDetailResponseDto,
  PlaceDetailResponseDto,
} from '../model/place/placeDetailResponseDto';
import {
  parsePlaceListResponseDto,
  PlaceListResponseDto,
} from '../model/place/placeListResponseDto';

export const getPerformanceList = async (
  props: PerformanceListProps,
): Promise<PerformanceListResponseDto> => {
  const response = await kopisApi.get<string>('/openApi/restful/pblprfr', {
    params: {
      service: props.service,
      stdate: props.startDate,
      eddate: props.endDate,
      cpage: props.currentPage,
      rows: props.rowsPerPage,
      prfstate: props.performanceState,
      signgucode: props.signGuCode,
      signgucodesub: props.signGuCodeSub,
      kidstate: props.kidState,
      shcate: props.genreCode,
      shprfnm: props.keyword,
    },
    responseType: 'text',
  });

  return parsePerformanceListResponseDto(response.data);
};

export async function getBoxoffice(
  props: BoxofficeProps,
): Promise<BoxofficeResponseDto> {
  const response = await kopisApi.get<string>('/openApi/restful/boxoffice', {
    params: {
      service: props.service,
      stdate: props.startDate,
      eddate: props.endDate,
      catecode: props.genreCode,
      area: props.area,
    },
    responseType: 'text',
  });
  return parseBoxofficeResponseDto(response.data);
}

export async function getPerformanceDetail(
  props: PerformanceDetailProps,
): Promise<PerformanceDetailResponseDto> {
  const response = await kopisApi.get<string>(
    `/openApi/restful/pblprfr/${props.id}`,
    {
      params: {
        service: props.servicekey,
      },
      responseType: 'text',
    },
  );
  return parsePerformanceDetailResponseDto(response.data);
}

export async function searchPlace(
  props: PlaceDetailProps,
): Promise<PlaceListResponseDto> {
  const response = await kopisApi.get<string>('/openApi/restful/prfplc', {
    params: {
      service: props.servicekey,
      cpage: props.currentPage,
      rows: props.rowsPerPage,
      shprfnmfct: props.keyword,
    },
    responseType: 'text',
  });
  return parsePlaceListResponseDto(response.data);
}

export async function getPlaceDetail(
  props: PerformanceDetailProps,
): Promise<PlaceDetailResponseDto> {
  const response = await kopisApi.get<string>(
    `/openApi/restful/prfplc/${props.id}`,
    {
      params: {
        service: props.servicekey,
      },
      responseType: 'text',
    },
  );
  return parsePlaceDetailResponseDto(response.data);
}

export async function getFestivalList(
  props: PerformanceListProps,
): Promise<PerformanceListResponseDto> {
  const response = await kopisApi.get<string>('/openApi/restful/prffest', {
    params: {
      service: props.service,
      stdate: props.startDate,
      eddate: props.endDate,
      cpage: props.currentPage,
      rows: props.rowsPerPage,
      signgucode: props.signGuCode,
      signgucodesub: props.signGuCodeSub,
    },
    responseType: 'text',
  });
  return parsePerformanceListResponseDto(response.data);
}
