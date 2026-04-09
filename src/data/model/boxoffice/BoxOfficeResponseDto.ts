import { XMLParser } from 'fast-xml-parser';
import { BoxofficeItemDto } from './boxofficeDto';

export interface BoxofficeResponseDto {
  boxOfficeList?: BoxofficeItemDto[];
}

const parser = new XMLParser({ ignoreAttributes: false });

export const parseBoxofficeResponseDto = (
  xml: string,
): BoxofficeResponseDto => {
  const parsed = parser.parse(xml);
  const items = parsed?.boxofs?.boxof;

  if (!items) return { boxOfficeList: [] };

  const list = Array.isArray(items) ? items : [items];

  return {
    boxOfficeList: list.map((item: Record<string, string>) => ({
      category: item.cate,
      rank: item.rnum,
      performanceName: item.prfnm,
      performancePeriod: item.prfpd,
      performanceCount: item.prfdtcnt,
      area: item.area,
      placeName: item.prfplcnm,
      seatCount: item.seatcnt,
      posterUrl: item.poster?.trim(),
      performanceId: item.mt20id,
    })),
  };
};
