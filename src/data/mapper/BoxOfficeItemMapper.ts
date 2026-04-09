import { BoxofficeItem } from '../../domain/model/boxofficeItem';
import { toShortAreaName } from '../../domain/util/util';
import { BoxofficeItemDto } from '../model/boxoffice/boxofficeDto';

export function toBoxOfficeItem(dto?: BoxofficeItemDto | null): BoxofficeItem {
  if (!dto) return {};
  return {
    category: dto.category,
    rank: dto.rank,
    performanceName: dto.performanceName,
    performancePeriod: dto.performancePeriod,
    performanceCount: dto.performanceCount,
    area: toShortAreaName(dto.area),
    placeName: dto.placeName,
    seatCount: dto.seatCount,
    posterUrl: dto.posterUrl,
    performanceId: dto.performanceId,
  };
}
