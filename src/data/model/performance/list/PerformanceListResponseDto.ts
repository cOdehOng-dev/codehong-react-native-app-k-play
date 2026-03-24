import { XMLParser } from 'fast-xml-parser';
import { PerformanceItemDto } from './PerformanceItemDto';

export interface PerformanceListResponseDto {
  performances?: PerformanceItemDto[];
}

const parser = new XMLParser({ ignoreAttributes: false });

export function parsePerformanceListResponseDto(xml: string): PerformanceListResponseDto {
  const parsed = parser.parse(xml);
  const items = parsed?.dbs?.db;

  if (!items) return { performances: [] };

  const list = Array.isArray(items) ? items : [items];

  return {
    performances: list.map((item: Record<string, string>) => ({
      id: item.mt20id,
      name: item.prfnm,
      startDate: item.prfpdfrom,
      endDate: item.prfpdto,
      facilityName: item.fcltynm,
      posterUrl: item.poster,
      area: item.area,
      genre: item.genrenm,
      openRun: item.openrun,
      state: item.prfstate,
      awards: item.awards,
    })),
  };
}
