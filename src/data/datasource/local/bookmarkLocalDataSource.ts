import { Database, Q } from '@nozbe/watermelondb';
import { BookmarkPerformanceEntity } from '../../model/bookmark/BookmarkPerformanceEntity';
import { BookMarkPerformance } from '../../../domain/model/bookMarkPerformance';
import { toBookmarkPerformance } from '../../mapper/bookmarkPerformanceMapper';

/**
 * 북마크 로컬 데이터소스
 * - WatermelonDB를 통해 SQLite CRUD 작업을 담당
 * - Repository 레이어에서만 사용 (Presentation 레이어에 직접 노출 X)
 *
 * Android의 Room DAO와 동일한 역할
 */
export class BookmarkLocalDataSource {
  constructor(private readonly db: Database) {}

  /**
   * bookmarks 컬렉션(테이블) 접근 헬퍼
   * - db.get<T>('table_name') → 해당 테이블의 컬렉션 반환
   */
  private get collection() {
    return this.db.get<BookmarkPerformanceEntity>('bookmarks');
  }

  /**
   * 저장된 모든 북마크 조회
   * - query().fetch() → 전체 레코드를 Promise<BookmarkRecord[]>로 반환
   */
  async getAll(): Promise<BookMarkPerformance[]> {
    const records = await this.collection.query().fetch();
    return records.map(r => toBookmarkPerformance(r));
  }

  /**
   * 특정 공연이 북마크에 저장되어 있는지 확인
   * - Q.where('컬럼명', 값): SQL WHERE 절에 해당
   * - name 컬럼으로 필터링 후 결과가 존재하면 true
   */
  async isBookmarked(name: string): Promise<boolean> {
    const records = await this.collection.query(Q.where('name', name)).fetch();
    return records.length > 0;
  }

  /**
   * 새 북마크 저장
   * - WatermelonDB는 쓰기 작업을 반드시 db.write() 트랜잭션으로 감싸야 함
   * - collection.create(callback): 새 레코드 생성 후 콜백에서 필드 값 설정
   * - @field 데코레이터로 선언된 프로퍼티에 직접 할당
   */
  async save(item: BookMarkPerformance): Promise<void> {
    await this.db.write(async () => {
      await this.collection.create(record => {
        record.performanceId = item.id ?? null;
        record.name = item.name ?? null;
        record.posterUrl = item.posterUrl ?? null;
        record.startDate = item.startDate ?? null;
        record.endDate = item.endDate ?? null;
        record.facilityName = item.facilityName ?? null;
      });
    });
  }

  /**
   * name 기준으로 북마크 삭제
   * - Q.where로 해당 레코드를 찾은 후 destroyPermanently()로 완전 삭제
   * - destroyPermanently(): 동기화 마킹 없이 DB에서 즉시 물리 삭제
   *   (vs markAsDeleted(): 동기화를 위해 삭제 마킹만 함)
   */
  async remove(id: string): Promise<void> {
    await this.db.write(async () => {
      const records = await this.collection
        .query(Q.where('performance_id', id))
        .fetch();
      for (const record of records) {
        await record.destroyPermanently();
      }
    });
  }
}
