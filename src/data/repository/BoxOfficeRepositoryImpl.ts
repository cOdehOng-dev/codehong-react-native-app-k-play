import { BoxOfficeParams } from '../../domain/model/apiparams/BoxOfficeParams';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import { BoxOfficeRepository } from '../../domain/repository/BoxOfficeRepository';
import { BoxOfficeRemoteDataSource } from '../datasource/BoxOfficeRemoteDataSource';
import { asDomain } from '../mapper/BoxOfficeItemMapper';

export class BoxOfficeRepositoryImpl implements BoxOfficeRepository {
  constructor(private readonly remote: BoxOfficeRemoteDataSource) {}

  async getBoxOfficeList(params: BoxOfficeParams): Promise<BoxOfficeItem[]> {
    const dto = await this.remote.getBoxOffice(params);
    const ss = dto.boxOfficeList?.map(item => asDomain(item));
    console.log(`item = ${ss!![0].rank}`);
    console.log(`mapper = ${dto.boxOfficeList?.map(item => asDomain(item))}`);
    return dto.boxOfficeList?.map(item => asDomain(item)) || [];
  }
}
