import { PlaceDetail } from '../../domain/model/place/placeDetail';
import { FacilitySummaryDto } from '../model/place/facilitySummaryDto';

export function placeInfoItemtoPlaceDetail(
  dto?: FacilitySummaryDto | null,
): PlaceDetail {
  if (!dto) return {};

  return {
    placeId: dto.id,
    placeName: dto.name,
  };
}
