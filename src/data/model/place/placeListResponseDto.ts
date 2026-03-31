import { XMLParser } from 'fast-xml-parser';
import { FacilityDto } from './facilityDto';

export interface PlaceListResponseDto {
  facilities?: FacilityDto[] | null;
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
      name: item.fcltyNm ?? null,
      id: item.mt10Id ?? null,
      address: item.adres ?? null,
      latitude: item.la ?? null,
      longitude: item.lo ?? null,
    })),
  };
}
