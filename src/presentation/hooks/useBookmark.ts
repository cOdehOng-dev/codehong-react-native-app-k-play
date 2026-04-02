import { useCallback, useEffect, useState } from 'react';
import { useDI } from '../../di/DIContext';
import { BookMarkPerformance } from '../../domain/model/bookMarkPerformance';

/**
 * 북마크 기능을 위한 Presentation 훅
 *
 * - bookmarks: 저장된 전체 북마크 목록
 * - isBookmarked: 전달된 name의 공연이 북마크되어 있는지 여부
 * - saveBookmark: 북마크 저장 (WatermelonDB에 persist)
 * - removeBookmark: 북마크 삭제 (WatermelonDB에서 제거)
 * - loadBookmarks: 전체 북마크 다시 로드
 *
 * @param name - 상세 화면에서 현재 공연의 북마크 여부를 확인할 때 전달
 */
export function useBookmark(name?: string | null) {
  const { bookmarkUseCase } = useDI();

  const [bookmarks, setBookmarks] = useState<BookMarkPerformance[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // WatermelonDB에서 전체 북마크 로드
  const loadBookmarks = useCallback(async () => {
    const items = await bookmarkUseCase.getAll();
    setBookmarks(items);
  }, [bookmarkUseCase]);

  // 마운트 시 북마크 목록 초기 로드
  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  // name이 주어진 경우 해당 공연의 북마크 여부를 DB에서 확인
  useEffect(() => {
    if (!name) {
      setIsBookmarked(false);
      return;
    }
    bookmarkUseCase.isBookmarked(name).then(setIsBookmarked);
  }, [name, bookmarkUseCase]);

  /** 북마크 저장: DB에 persist 후 로컬 상태 갱신 */
  const saveBookmark = useCallback(
    async (item: BookMarkPerformance) => {
      await bookmarkUseCase.save(item);
      setIsBookmarked(true);
      await loadBookmarks();
    },
    [bookmarkUseCase, loadBookmarks],
  );

  /** 북마크 삭제: DB에서 제거 후 로컬 상태 갱신 */
  const removeBookmark = useCallback(
    async (itemId: string) => {
      await bookmarkUseCase.remove(itemId);
      setIsBookmarked(false);
      await loadBookmarks();
    },
    [bookmarkUseCase, loadBookmarks],
  );

  return {
    bookmarks,
    isBookmarked,
    saveBookmark,
    removeBookmark,
    loadBookmarks,
  };
}
