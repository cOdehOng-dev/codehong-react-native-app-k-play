import { PlaceDetail } from '../../domain/model/place/placeDetail';
import { FacilityDto } from '../model/place/facilityDto';

export function placeDetailDtoToPlaceDetail(
  dto?: FacilityDto | null,
): PlaceDetail {
  if (!dto) return {};

  return {
    placeId: dto.id,
    placeName: dto.name,
    placeAddress: dto.address,
    latitude: dto.latitude,
    longitude: dto.longitude,
  };
}
