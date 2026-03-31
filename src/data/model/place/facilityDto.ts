export interface FacilityDto {
  name?: string | null; // 시설명 (고양종합운동장)
  id?: string | null; // 시설 ID
  address?: string | null; // 주소
  latitude?: string | null; // 위도 (Double 변환 필요)
  longitude?: string | null; // 경도 (Double 변환 필요)
}
