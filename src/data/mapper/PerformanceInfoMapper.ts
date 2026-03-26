import { PerformanceItemDto } from '../model/performance/list/PerformanceItemDto';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import { toShortAreaName } from '../../domain/util/util';

export function asDomain(dto?: PerformanceItemDto | null): PerformanceInfoItem {
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
