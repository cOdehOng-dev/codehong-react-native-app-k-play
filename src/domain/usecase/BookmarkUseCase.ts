import { BookMarkPerformance } from '../model/bookMarkPerformance';
import { BookmarkRepository } from '../repository/BookmarkRepository';

/**
 * 북마크 UseCase (Domain 레이어)
 * - 북마크 관련 비즈니스 로직의 진입점
 * - Repository 인터페이스에만 의존 (구현체 무관)
 * - 현재는 단순 위임이지만, 중복 저장 방지 등 비즈니스 규칙 추가 가능
 */
export class BookmarkUseCase {
  constructor(private readonly repository: BookmarkRepository) {}

  /** 저장된 모든 북마크 조회 */
  getAll(): Promise<BookMarkPerformance[]> {
    return this.repository.getAll();
  }

  /** 특정 공연 이름이 북마크에 있는지 확인 */
  isBookmarked(name: string): Promise<boolean> {
    return this.repository.isBookmarked(name);
  }

  /** 북마크 저장 */
  save(item: BookMarkPerformance): Promise<void> {
    return this.repository.save(item);
  }

  /** 북마크 삭제 (id 기준) */
  remove(id: string): Promise<void> {
    return this.repository.remove(id);
  }
}
