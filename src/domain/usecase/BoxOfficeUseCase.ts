import { BoxofficeProps } from '../model/apiprops/BoxofficeProps';
import { BoxOfficeItem } from '../model/BoxOfficeItem';
import { BoxofficeRepository } from '../repository/BoxofficeRepository';

export class BoxofficeUseCase {
  constructor(private readonly repository: BoxofficeRepository) {}

  async getRankList(props: BoxofficeProps): Promise<BoxOfficeItem[]> {
    return this.repository.getRankList(props);
  }
}
