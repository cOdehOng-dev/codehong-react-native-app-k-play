import { BoxofficeProps } from '../model/apiprops/boxofficeProps';
import { BoxofficeItem } from '../model/boxofficeItem';

export interface BoxofficeRepository {
  getRankList(props: BoxofficeProps): Promise<BoxofficeItem[]>;
}
