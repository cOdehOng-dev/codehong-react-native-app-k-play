import { BoxOfficeParams } from '../model/apiprops/BoxOfficeParams';
import { BoxOfficeItem } from '../model/BoxOfficeItem';

export interface BoxofficeRepository {
  getBoxOfficeList(params: BoxOfficeParams): Promise<BoxOfficeItem[]>;
}
