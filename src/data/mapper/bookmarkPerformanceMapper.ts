import { BookMarkPerformance } from '../../domain/model/bookMarkPerformance';
import { BookmarkPerformanceEntity } from '../model/bookmark/BookmarkPerformanceEntity';

export function toBookmarkPerformance(
  entity?: BookmarkPerformanceEntity | null,
): BookMarkPerformance {
  if (!entity) return {};
  return {
    id: entity.performanceId,
    name: entity.name,
    posterUrl: entity.posterUrl,
    startDate: entity.startDate,
    endDate: entity.endDate,
    facilityName: entity.facilityName,
  };
}
