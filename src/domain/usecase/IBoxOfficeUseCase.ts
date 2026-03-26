import { BoxOfficeParams } from '../model/apiparams/BoxOfficeParams';
import { BoxOfficeItem } from '../model/BoxOfficeItem';

export interface IBoxOfficeUseCase {
  getBoxOfficeList(params: BoxOfficeParams): Promise<BoxOfficeItem[]>;
}
