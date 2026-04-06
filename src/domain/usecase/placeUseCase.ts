import { PlaceDetailProps } from '../model/apiprops/placeDetailProps';
import { PerformanceRepository } from '../repository/PerformanceRepository';
import { PlaceDetail } from '../model/place/placeDetail';

export class PlaceUseCase {
  constructor(private readonly repository: PerformanceRepository) {}

  async searchPlace(
    props: PlaceDetailProps,
    errorMessage: (msg: string) => void,
  ): Promise<PlaceDetail | null> {
    console.log('[PlaceUseCase] searchPlace 시작, keyword:', props.keyword);
    const placeList = await this.repository.searchPlace(props, errorMessage);
    console.log(
      '[PlaceUseCase] placeList 타입:',
      typeof placeList,
      ', 값:',
      JSON.stringify(placeList),
    );

    const placeId = placeList?.find(
      placeInfo => placeInfo.placeName === props.keyword,
    )?.placeId;
    console.log('[PlaceUseCase] 찾은 placeId:', placeId);

    if (!placeId) {
      console.log('[PlaceUseCase] placeId 없음, null 반환');
      return null;
    }

    console.log('[PlaceUseCase] getPlaceDetail 호출, id:', placeId);
    return this.repository.getPlaceDetail(
      {
        servicekey: props.servicekey,
        id: placeId,
      },
      errorMessage,
    );
  }
}
