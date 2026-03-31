export interface FacilitySummaryDto {
  fcltyNm?: string | null; // 시설명
  mt10Id?: string | null; // 시설 ID (FC003577)
  mt13Cnt?: string | null; // 공연장 수 (4) - 숫자가 아닌 경우 대비 string
  fcltyChartr?: string | null; // 시설 특성 (기타(비공연장))
  sidoNm?: string | null; // 시도 명 (경기)
  gugunNm?: string | null; // 구군 명 (고양시)
  openDe?: string | null; // 개관연도 (2003)
}
