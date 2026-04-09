// Detail 화면의 UI 선택 상태만 관리
// 북마크 여부는 useBookmark 훅이 DB에서 직접 조회하므로 여기서 관리하지 않음
export type DetailState = {
  id: string;
};

export const initialDetailState: DetailState = {
  id: '',
};
