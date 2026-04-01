import { BookMarkPerformance } from '../model/bookMarkPerformance';

/**
 * 북마크 Repository 인터페이스 (Domain 레이어)
 * - 실제 구현(WatermelonDB)을 모르는 순수 추상 계약
 * - 테스트 시 Mock으로 교체 가능
 */
export interface BookmarkRepository {
  getAll(): Promise<BookMarkPerformance[]>;
  isBookmarked(name: string): Promise<boolean>;
  save(item: BookMarkPerformance): Promise<void>;
  remove(name: string): Promise<void>;
}
