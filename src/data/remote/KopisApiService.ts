import { PerformanceListParams } from '../../domain/model/PerformanceListParams';
import { kopisApi } from '../api/instance';
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
