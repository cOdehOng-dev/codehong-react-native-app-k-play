import { BoxofficeProps } from '../model/apiprops/boxofficeProps';
import { BoxOfficeItem } from '../model/BoxOfficeItem';

export interface BoxofficeRepository {
  getRankList(props: BoxofficeProps): Promise<BoxOfficeItem[]>;
}
