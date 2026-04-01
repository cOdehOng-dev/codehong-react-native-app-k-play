import { BoxOfficeParams } from '../../domain/model/apiprops/BoxOfficeParams';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import { BoxOfficeRepository } from '../../domain/repository/BoxOfficeRepository';
import { BoxOfficeRemoteDataSource } from '../datasource/boxOfficeRemoteDataSource';
import { asDomain } from '../mapper/BoxOfficeItemMapper';

export class BoxOfficeRepositoryImpl implements BoxOfficeRepository {
  constructor(private readonly remote: BoxOfficeRemoteDataSource) {}

  async getBoxOfficeList(params: BoxOfficeParams): Promise<BoxOfficeItem[]> {
    const dto = await this.remote.getBoxOffice(params);
    return dto.boxOfficeList?.map(item => asDomain(item)) || [];
  }
}
