import { XMLParser } from 'fast-xml-parser';
import { FacilityDto } from './facilityDto';

export interface PlaceDetailResponseDto {
  facilities?: FacilityDto[] | null;
}

const parser = new XMLParser({
  ignoreAttributes: false,
});

export function parsePlaceDetailResponseDto(
  xml: string,
): PlaceDetailResponseDto {
  const parsed = parser.parse(xml);
  const items = parsed?.dbs?.db;

  if (!items) return { facilities: null };

  const list = Array.isArray(items) ? items : [items];

  return {
    facilities: list.map((item: Record<string, string>) => ({
      name: item.fcltynm ?? null,
      id: item.mt10id ?? null,
      address: item.adres ?? null,
      latitude: item.la ?? null,
      longitude: item.lo ?? null,
    })),
  };
}
