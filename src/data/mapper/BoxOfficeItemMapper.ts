import { BoxofficeItem } from '../../domain/model/boxofficeItem';
import { toShortAreaName } from '../../domain/util/util';
import { BoxOfficeItemDto } from '../model/boxoffice/BoxOfficeDto';

export function toBoxOfficeItem(dto?: BoxOfficeItemDto | null): BoxofficeItem {
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
