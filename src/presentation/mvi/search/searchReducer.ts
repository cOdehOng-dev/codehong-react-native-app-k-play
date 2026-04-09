import { SearchAction } from './searchAction';
import { SearchState } from './searchState';

export const searchReducer = (
  state: SearchState,
  action: SearchAction,
): SearchState => {
  switch (action.type) {
    case 'SET_KEYWORD':
      return { ...state, keyword: action.payload };
    case 'SET_INPUT_KEYWORD':
      return { ...state, inputKeyword: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_KEYWORD_LIST':
      return { ...state, recentKeywordList: action.payload };
    default:
      return state;
  }
};
