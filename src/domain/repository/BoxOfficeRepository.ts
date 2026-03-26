import { BoxOfficeParams } from '../model/apiparams/BoxOfficeParams';
import { BoxOfficeItem } from '../model/BoxOfficeItem';

export interface BoxOfficeRepository {
  getBoxOfficeList(params: BoxOfficeParams): Promise<BoxOfficeItem[]>;
}
