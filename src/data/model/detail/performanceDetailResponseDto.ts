import { XMLParser } from 'fast-xml-parser';
import { PerformanceDetailDto } from './performanceDetailDto';

export interface PerformanceDetailResponseDto {
  detail?: PerformanceDetailDto | null;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  isArray: name => ['styurl', 'relate'].includes(name),
});

export const parsePerformanceDetailResponseDto = (
  xml: string,
): PerformanceDetailResponseDto => {
  const parsed = parser.parse(xml);
  const item = parsed?.dbs?.db;

  if (!item) return { detail: null };

  const db = Array.isArray(item) ? item[0] : item;

  const styurls = db?.styurls?.styurl;
  const imageUrlList: string[] = styurls
    ? (Array.isArray(styurls) ? styurls : [styurls])
        .map((url: string) => url?.trim())
        .filter(Boolean)
    : [];

  const relates = db?.relates?.relate;
  const ticketSiteList = relates
    ? (Array.isArray(relates) ? relates : [relates]).map((r: any) => ({
        name: r?.relatenm ?? null,
        url: r?.relateurl ?? null,
      }))
    : [];

  return {
    detail: {
      id: db?.mt20id ?? null,
      name: db?.prfnm ?? null,
      startDate: db?.prfpdfrom ?? null,
      endDate: db?.prfpdto ?? null,
      facilityName: db?.fcltynm ?? null,
      cast: db?.prfcast ?? null,
      crew: db?.prfcrew ?? null,
      runtime: db?.prfruntime ?? null,
      ageLimit: db?.prfage ?? null,
      hostCompany: db?.entrpsnmH ?? null,
      sponsorCompany: db?.entrpsnmS ?? null,
      priceInfo: db?.pcseguidance ?? null,
      posterUrl: db?.poster?.trim() ?? null,
      description: db?.sty ?? null,
      area: db?.area ?? null,
      genre: db?.genrenm ?? null,
      openRun: db?.openrun ?? null,
      visit: db?.visit ?? null,
      child: db?.child ?? null,
      daehakro: db?.daehakro ?? null,
      festival: db?.festival ?? null,
      musicalLicense: db?.musicallicense ?? null,
      musicalCreate: db?.musicalcreate ?? null,
      updateDate: db?.updatedate ?? null,
      state: db?.prfstate ?? null,
      facilityId: db?.mt10id ?? null,
      dateGuidance: db?.dtguidance ?? null,
      imageUrlList,
      ticketSiteList,
    },
  };
};
