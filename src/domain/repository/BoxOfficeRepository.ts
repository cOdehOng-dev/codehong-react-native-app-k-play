import { BoxofficeProps } from '../model/apiprops/BoxofficeProps';
import { BoxOfficeItem } from '../model/BoxOfficeItem';

export interface BoxofficeRepository {
  getRankList(props: BoxofficeProps): Promise<BoxOfficeItem[]>;
}
