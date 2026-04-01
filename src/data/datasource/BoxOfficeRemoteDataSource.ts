import { BoxOfficeParams } from '../../domain/model/apiprops/BoxOfficeParams';
import { BoxOfficeResponseDto } from '../model/boxoffice/BoxOfficeResponseDto';
import { getBoxOffice } from '../remote/kopisApiService';

export class BoxofficeRemoteDataSource {
  async getBoxOffice(params: BoxOfficeParams): Promise<BoxOfficeResponseDto> {
    try {
      return await getBoxOffice(params);
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 401) throw new Error('인증 키가 유효하지 않습니다.');
      if (status === 404) throw new Error('공연 데이터를 찾을 수 없습니다.');
      throw new Error('네트워크 오류가 발생했습니다.');
    }
  }
}
