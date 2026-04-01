import { BoxOfficeParams } from '../model/apiprops/BoxOfficeParams';
import { BoxOfficeItem } from '../model/BoxOfficeItem';
import { BoxofficeRepository } from '../repository/BoxofficeRepository';

export class BoxOfficeUseCase {
  constructor(private readonly repository: BoxofficeRepository) {}

  async getBoxOfficeList(params: BoxOfficeParams): Promise<BoxOfficeItem[]> {
    return this.repository.getBoxOfficeList(params);
  }
}
