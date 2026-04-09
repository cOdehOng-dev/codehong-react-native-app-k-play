export type DetailAction =
  | { type: 'SET_PERFORMANCE_ID'; id: string }
  // 북마크 저장/삭제 — 순수 UI Intent (실제 DB 작업은 ViewModel에서 처리)
  | { type: 'SAVE_BOOKMARK' }
  | { type: 'REMOVE_BOOKMARK' };
