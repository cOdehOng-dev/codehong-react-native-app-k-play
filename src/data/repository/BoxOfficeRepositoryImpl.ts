import { BoxOfficeParams } from '../../domain/model/apiprops/BoxOfficeParams';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import { BoxofficeRepository } from '../../domain/repository/BoxofficeRepository';
import { BoxofficeRemoteDataSource } from '../datasource/BoxOfficeRemoteDataSource';
import { toBoxOfficeItem } from '../mapper/BoxOfficeItemMapper';

export class BoxofficeRepositoryImpl implements BoxofficeRepository {
  constructor(private readonly remote: BoxofficeRemoteDataSource) {}

  async getBoxOfficeList(params: BoxOfficeParams): Promise<BoxOfficeItem[]> {
    const dto = await this.remote.getBoxOffice(params);
    return dto.boxOfficeList?.map(item => toBoxOfficeItem(item)) || [];
  }
}
