import { BookmarkRepository } from '../../domain/repository/BookmarkRepository';
import { BookMarkPerformance } from '../../domain/model/bookMarkPerformance';
import { BookmarkLocalDataSource } from '../datasource/bookmarkLocalDataSource';

/**
 * BookmarkRepository 구현체 (Data 레이어)
 * - Domain의 BookmarkRepository 인터페이스를 구현
 * - 로컬 데이터소스(WatermelonDB)에 위임
 * - 추후 Remote DataSource 추가 시 여기서 병합 로직 처리
 */
export class BookmarkRepositoryImpl implements BookmarkRepository {
  constructor(private readonly local: BookmarkLocalDataSource) {}

  getAll(): Promise<BookMarkPerformance[]> {
    return this.local.getAll();
  }

  isBookmarked(name: string): Promise<boolean> {
    return this.local.isBookmarked(name);
  }

  save(item: BookMarkPerformance): Promise<void> {
    return this.local.save(item);
  }

  remove(id: string): Promise<void> {
    return this.local.remove(id);
  }
}
