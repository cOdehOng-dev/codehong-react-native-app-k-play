import { useCallback, useEffect, useState } from 'react';
import { useDI } from '../../di/DIContext';

export const useRecentKeyword = () => {
  const { recentKeywordUseCase } = useDI();

  const [recentKeywordList, setRecentKeywordList] = useState<string[]>([]);

  const loadRecentKeywordList = useCallback(async () => {
    const keyowrdList = await recentKeywordUseCase.getRecentKeywordList();
    setRecentKeywordList(keyowrdList);
  }, [recentKeywordUseCase]);

  useEffect(() => {
    loadRecentKeywordList();
  }, [loadRecentKeywordList]);

  const saveRecentKeyword = useCallback(
    async (word: string) => {
      await recentKeywordUseCase.saveRecentKeyword(word);
      await loadRecentKeywordList();
    },
    [recentKeywordUseCase, loadRecentKeywordList],
  );

  const removeRecentKeyword = useCallback(
    async (word: string) => {
      await recentKeywordUseCase.removeRecentKeyword(word);
      await loadRecentKeywordList();
    },
    [recentKeywordUseCase, loadRecentKeywordList],
  );

  const clearAllRecentKeywordList = useCallback(async () => {
    await recentKeywordUseCase.clearAllRecentKeyword();
    await loadRecentKeywordList();
  }, [recentKeywordUseCase, loadRecentKeywordList]);

  return {
    recentKeywordList,
    loadRecentKeywordList,
    saveRecentKeyword,
    removeRecentKeyword,
    clearAllRecentKeywordList,
  };
};
