export type SearchAction =
  | { type: 'SET_KEYWORD'; keyword: string }
  | { type: 'SET_LOADING'; loading: boolean };
