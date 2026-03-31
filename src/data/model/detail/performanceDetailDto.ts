import { RelateDto } from './relateDto';

export interface PerformanceDetailDto {
  id?: string | null;
  name?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  facilityName?: string | null;
  cast?: string | null;
  crew?: string | null;
  runtime?: string | null;
  ageLimit?: string | null;
  hostCompany?: string | null;
  sponsorCompany?: string | null;
  priceInfo?: string | null;
  posterUrl?: string | null;
  description?: string | null;
  area?: string | null;
  genre?: string | null;
  openRun?: string | null;
  visit?: string | null;
  child?: string | null;
  daehakro?: string | null;
  festival?: string | null;
  musicalLicense?: string | null;
  musicalCreate?: string | null;
  updateDate?: string | null;
  state?: string | null;
  facilityId?: string | null;
  dateGuidance?: string | null;
  imageUrlList?: string[] | null;
  ticketSiteList?: RelateDto[] | null;
}
