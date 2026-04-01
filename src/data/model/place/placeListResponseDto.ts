import { XMLParser } from 'fast-xml-parser';
import { FacilitySummaryDto } from './facilitySummaryDto';

export interface PlaceListResponseDto {
  facilities?: FacilitySummaryDto[] | null;
}

const parser = new XMLParser({
  ignoreAttributes: false,
});

export function parsePlaceListResponseDto(xml: string): PlaceListResponseDto {
  console.log('[parsePlaceList] raw XML:', xml);
  const parsed = parser.parse(xml);
  console.log('[parsePlaceList] parsed 결과:', JSON.stringify(parsed));
  const items = parsed?.dbs?.db;
  console.log('[parsePlaceList] items:', JSON.stringify(items));

  if (!items) return { facilities: null };

  const list = Array.isArray(items) ? items : [items];

  console.log('[parsePlaceList] list:', JSON.stringify(list));

  return {
    facilities: list.map((item: Record<string, string>) => ({
      id: item.mt10id ?? null,
      name: item.fcltynm ?? null,
    })),
  };
}
