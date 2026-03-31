import { Address } from './../../domain/util/LocationUtil';
import { PlaceDetail } from '../../domain/model/place/placeDetail';
import { FacilityDto } from '../model/place/facilityDto';

export function toPlaceDetail(dto?: FacilityDto | null): PlaceDetail {
  if (!dto) return {};

  return {
    placeId: dto.id,
    placeName: dto.name,
    placeAddress: dto.address,
    latitude: dto.latitude,
    longitude: dto.longitude,
  };
}
