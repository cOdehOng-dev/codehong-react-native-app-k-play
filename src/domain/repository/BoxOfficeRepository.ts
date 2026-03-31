import { BoxOfficeParams } from '../model/apiprops/BoxOfficeParams';
import { BoxOfficeItem } from '../model/BoxOfficeItem';

export interface BoxOfficeRepository {
  getBoxOfficeList(params: BoxOfficeParams): Promise<BoxOfficeItem[]>;
}
