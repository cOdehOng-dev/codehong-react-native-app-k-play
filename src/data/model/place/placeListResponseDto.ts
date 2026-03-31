import { XMLParser } from 'fast-xml-parser';
import { FacilitySummaryDto } from './facilitySummaryDto';

export interface PlaceListResponseDto {
  facilities?: FacilitySummaryDto[] | null;
}

const parser = new XMLParser({
  ignoreAttributes: false,
});

export function parsePlaceListResponseDto(xml: string): PlaceListResponseDto {
  const parsed = parser.parse(xml);
  const items = parsed?.dbs?.db;

  if (!items) return { facilities: null };

  const list = Array.isArray(items) ? items : [items];

  return {
    facilities: list.map((item: Record<string, string>) => ({
      fcltyNm: item.fcltynm,
      mt10Id: item.mt10id,
      mt13Cnt: item.mt13cnt,
      fcltyChartr: item.fcltychartr,
      sidoNm: item.sidonm,
      gugunNm: item.gugunnm,
      openDe: item.opendate,
    })),
  };
}
