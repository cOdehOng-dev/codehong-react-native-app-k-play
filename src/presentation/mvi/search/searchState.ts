export type SearchState = {
  keyword: string;
  isLoading: boolean;
};

export const initialSearchState: SearchState = {
  keyword: '',
  isLoading: false,
};
