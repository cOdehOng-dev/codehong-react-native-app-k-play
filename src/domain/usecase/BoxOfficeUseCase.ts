import { BoxOfficeParams } from '../model/apiparams/BoxOfficeParams';
import { BoxOfficeItem } from '../model/BoxOfficeItem';
import { BoxOfficeRepository } from '../repository/BoxOfficeRepository';
import { IBoxOfficeUseCase } from './IBoxOfficeUseCase';

export class BoxOfficeUseCase implements IBoxOfficeUseCase {
  constructor(private readonly repository: BoxOfficeRepository) {}

  async getBoxOfficeList(params: BoxOfficeParams): Promise<BoxOfficeItem[]> {
    return this.repository.getBoxOfficeList(params);
  }
}
