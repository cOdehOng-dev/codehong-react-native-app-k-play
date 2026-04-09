export type SearchAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_KEYWORD'; payload: string }
  | { type: 'SET_INPUT_KEYWORD'; payload: string }
  | { type: 'SET_KEYWORD_LIST'; payload: string[] };
