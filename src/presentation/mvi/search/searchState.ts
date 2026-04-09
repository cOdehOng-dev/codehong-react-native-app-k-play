export type SearchState = {
  keyword: string; // 실제 검색에 사용되는 키워드 (검색 버튼 눌렀을 때만 업데이트)
  inputKeyword: string; // TextInput 현재 입력값 (타이핑마다 업데이트, 조건 표시용)
  isLoading: boolean;
  recentKeywordList: string[];
};

export const initialSearchState: SearchState = {
  keyword: '',
  inputKeyword: '',
  isLoading: false,
  recentKeywordList: [],
};
