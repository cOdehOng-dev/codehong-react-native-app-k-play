import { PerformanceListParams } from './../../domain/model/apiparams/PerformanceListParams';
import { BoxOfficeParams } from '../../domain/model/apiparams/BoxOfficeParams';
import { kopisApi } from '../api/instance';
import {
  BoxOfficeResponseDto,
  parseBoxOfficeResponseDto,
} from '../model/boxoffice/BoxOfficeResponseDto';
import {
  parsePerformanceListResponseDto,
  PerformanceListResponseDto,
} from '../model/performance/list/PerformanceListResponseDto';

export const getPerformanceList = async (
  params: PerformanceListParams,
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
