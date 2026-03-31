import { PerformanceItemDto } from '../model/performance/list/PerformanceItemDto';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import { toShortAreaName } from '../../domain/util/util';
import { PerformanceDetailDto } from '../model/detail/performanceDetailDto';
import { PerformanceDetail } from '../../domain/model/detail/performanceDetail';
import { RelateDto } from '../model/detail/relateDto';
import { TicketingSite } from '../../domain/model/detail/ticketingSite';

export function toPerformanceItem(
  dto?: PerformanceItemDto | null,
): PerformanceInfoItem {
  if (!dto) return {};
  return {
    id: dto.id,
    name: dto.name,
    startDate: dto.startDate,
    endDate: dto.endDate,
    placeName: dto.facilityName,
    posterUrl: dto.posterUrl,
    area: toShortAreaName(dto.area),
    genre: dto.genre,
    openRun: dto.openRun,
    state: dto.state,
    awards: dto.awards?.split('&lt;br&gt;')[0],
  };
}

export function toPerformanceDetail(
  dto?: PerformanceDetailDto | null,
): PerformanceDetail {
  if (!dto) return {};
  return {
    id: dto.id,
    name: dto.name,
    startDate: dto.startDate,
    endDate: dto.endDate,
    facilityName: dto.facilityName,
    cast: dto.cast,
    crew: dto.crew,
    runtime: dto.runtime,
    ageLimit: dto.ageLimit,
    hostCompany: dto.hostCompany,
    sponsorCompany: dto.sponsorCompany,
    priceInfo: dto.priceInfo,
    posterUrl: dto.posterUrl,
    description: dto.description,
    area: dto.area,
    genre: dto.genre,
    child: dto.child,
    dateGuidance: dto.dateGuidance,
    imageUrlList: dto.imageUrlList ?? [],
    ticketSiteList: toTicketSiteList(dto.ticketSiteList),
  };
}

function toTicketSiteList(dto?: RelateDto[] | null): TicketingSite[] | null {
  if (!dto) return null;
  return dto.map(item => ({
    name: item?.name ?? undefined,
    url: item?.url ?? undefined,
  }));
}
