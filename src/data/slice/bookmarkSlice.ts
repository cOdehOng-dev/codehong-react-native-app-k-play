import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction';
import { createSlice } from './../../../node_modules/@reduxjs/toolkit/src/createSlice';
import { BookMarkPerformance } from '../../domain/model/bookMarkPerformance';

interface BookmarkState {
  bookmarks: BookMarkPerformance[];
}

const initialState: BookmarkState = {
  bookmarks: [],
};

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    save(state, action: PayloadAction<BookMarkPerformance>) {
      state.bookmarks.push(action.payload);
    },
    remove(state, action: PayloadAction<string>) {
      state.bookmarks = state.bookmarks.filter(
        bookmark => bookmark.name !== action.payload,
      );
    },
    clear(state) {
      state.bookmarks = [];
    },
    loadBookMarks(state, action: PayloadAction<BookMarkPerformance[]>) {
      state.bookmarks = action.payload;
    },
  },
});
