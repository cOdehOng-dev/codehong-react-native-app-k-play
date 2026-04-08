import { BoxofficeProps } from '../model/apiprops/boxofficeProps';
import { BoxofficeItem } from '../model/boxofficeItem';
import { BoxofficeRepository } from '../repository/BoxofficeRepository';

export class BoxofficeUseCase {
  constructor(private readonly repository: BoxofficeRepository) {}

  async getRankList(props: BoxofficeProps): Promise<BoxofficeItem[]> {
    return this.repository.getRankList(props);
  }
}
