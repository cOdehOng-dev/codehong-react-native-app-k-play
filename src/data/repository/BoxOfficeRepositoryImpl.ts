import { BoxofficeProps } from '../../domain/model/apiprops/BoxofficeProps';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import { BoxofficeRepository } from '../../domain/repository/BoxofficeRepository';
import { BoxofficeRemoteDataSource } from '../datasource/BoxOfficeRemoteDataSource';
import { toBoxOfficeItem } from '../mapper/BoxOfficeItemMapper';

export class BoxofficeRepositoryImpl implements BoxofficeRepository {
  constructor(private readonly remote: BoxofficeRemoteDataSource) {}

  async getRankList(props: BoxofficeProps): Promise<BoxOfficeItem[]> {
    const dto = await this.remote.getBoxOffice(props);
    return dto.boxOfficeList?.map(item => toBoxOfficeItem(item)) || [];
  }
}
