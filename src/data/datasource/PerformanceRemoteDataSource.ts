import { getPerformanceList } from './../remote/KopisApiService';
import { PerformanceListResponseDto } from './../model/performance/list/PerformanceListResponseDto';
import { PerformanceListParams } from '../remote/KopisApiService';

export class PerformanceRemoteDataSource {
  async getPerformanceList(
    params: PerformanceListParams,
  ): Promise<PerformanceListResponseDto> {
    try {
      return await getPerformanceList(params);
    } catch (e: any) {
      const status = e?.response?.status;
      const code = e?.code ?? '';
      const message = e?.message ?? '';
      const url = e?.config?.url ?? '';
      throw new Error(`[DEBUG] status=${status} code=${code} url=${url} msg=${message}`);
    }
  }
}
