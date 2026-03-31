import { TicketingSite } from './ticketingSite';

export type PerformanceDetail = {
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
  child?: string | null;
  updateDate?: string | null;
  state?: string | null;
  facilityId?: string | null;
  dateGuidance?: string | null;
  imageUrlList?: string[] | null;
  ticketSiteList?: TicketingSite[] | null;
};
