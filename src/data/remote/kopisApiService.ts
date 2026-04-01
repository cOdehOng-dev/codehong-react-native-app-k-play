import { BoxOfficeParams } from '../../domain/model/apiprops/BoxOfficeParams';
import { PerformanceDetailProps } from '../../domain/model/apiprops/performanceDetailProps';
import { PerformanceListProps } from '../../domain/model/apiprops/performanceListProps';
import { SearchPlaceProps } from '../../domain/model/apiprops/searchPlaceProps';
import { kopisApi } from '../api/instance';
import {
  BoxOfficeResponseDto,
  parseBoxOfficeResponseDto,
} from '../model/boxoffice/BoxOfficeResponseDto';
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
  params: PerformanceListProps,
): Promise<PerformanceListResponseDto> => {
  const response = await kopisApi.get<string>('/openApi/restful/pblprfr', {
    params: {
      service: params.service,
      stdate: params.startDate,
      eddate: params.endDate,
      cpage: params.currentPage,
      rows: params.rowsPerPage,
      prfstate: params.performanceState,
      signgucode: params.signGuCode,
      signgucodesub: params.signGuCodeSub,
      kidstate: params.kidState,
      shcate: params.genreCode,
    },
    responseType: 'text',
  });

  return parsePerformanceListResponseDto(response.data);
};

export const getBoxOffice = async (
  params: BoxOfficeParams,
): Promise<BoxOfficeResponseDto> => {
  const response = await kopisApi.get<string>('/openApi/restful/boxoffice', {
    params: {
      service: params.service,
      stdate: params.startDate,
      eddate: params.endDate,
      catecode: params.catecode,
      area: params.area,
    },
    responseType: 'text',
  });
  return parseBoxOfficeResponseDto(response.data);
};

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
  props: SearchPlaceProps,
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
  params: PerformanceDetailProps,
): Promise<PlaceDetailResponseDto> {
  const response = await kopisApi.get<string>(
    `/openApi/restful/prfplc/${params.id}`,
    {
      params: {
        service: params.servicekey,
      },
      responseType: 'text',
    },
  );
  return parsePlaceDetailResponseDto(response.data);
}
