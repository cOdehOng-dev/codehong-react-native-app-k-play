import { BoxofficeProps } from '../../domain/model/apiprops/boxofficeProps';
import { BoxofficeItem } from '../../domain/model/boxofficeItem';
import { BoxofficeRepository } from '../../domain/repository/BoxofficeRepository';
import { BoxofficeRemoteDataSource } from '../datasource/remote/boxofficeRemoteDataSource';
import { toBoxOfficeItem } from '../mapper/BoxOfficeItemMapper';

export class BoxofficeRepositoryImpl implements BoxofficeRepository {
  constructor(private readonly remote: BoxofficeRemoteDataSource) {}

  async getRankList(props: BoxofficeProps): Promise<BoxofficeItem[]> {
    const dto = await this.remote.getBoxOffice(props);
    return dto.boxOfficeList?.map(item => toBoxOfficeItem(item)) || [];
  }
}
