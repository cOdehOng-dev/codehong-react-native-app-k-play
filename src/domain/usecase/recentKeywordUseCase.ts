import { RecentKeywordRepository } from '../repository/recentKeywordRepository';

export const recentKeywordUseCase = (repository: RecentKeywordRepository) => ({
  getRecentKeywordList: async (): Promise<string[]> => {
    return repository.getRecentKeywordList();
  },
  saveRecentKeyword: async (keyword: string): Promise<string[]> => {
    return repository.saveRecentKeyword(keyword);
  },
  removeRecentKeyword: async (keyword: string): Promise<string[]> => {
    return repository.removeRecentKeyword(keyword);
  },
  clearAllRecentKeyword: async (): Promise<void> => {
    return repository.clearAllRecentKeyword();
  },
});

export type RecentKeywordUseCase = ReturnType<typeof recentKeywordUseCase>;
