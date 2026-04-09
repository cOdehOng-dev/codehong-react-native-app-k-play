import { RecentKeywordRepository } from '../../domain/repository/recentKeywordRepository';
import { RecentKeywordLocalDataSource } from '../datasource/local/recentKeywordLocalDataSource';

export class RecentKeywordRepositoryImpl implements RecentKeywordRepository {
  constructor(private readonly local: RecentKeywordLocalDataSource) {}

  getRecentKeywordList(): Promise<string[]> {
    return this.local.getAll();
  }
  saveRecentKeyword(keyword: string): Promise<string[]> {
    return this.local.save(keyword);
  }
  removeRecentKeyword(keyword: string): Promise<string[]> {
    return this.local.remove(keyword);
  }
  clearAllRecentKeyword(): Promise<void> {
    return this.local.clearAll();
  }
}
