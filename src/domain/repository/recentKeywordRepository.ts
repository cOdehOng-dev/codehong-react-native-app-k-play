export interface RecentKeywordRepository {
  getRecentKeywordList(): Promise<string[]>;
  saveRecentKeyword(keyword: string): Promise<string[]>;
  removeRecentKeyword(keyword: string): Promise<string[]>;
  clearAllRecentKeyword(): Promise<void>;
}
