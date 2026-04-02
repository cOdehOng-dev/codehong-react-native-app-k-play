import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

/**
 * WatermelonDB Model 클래스 - bookmarks 테이블의 단일 행(row)을 표현
 *
 * @field 데코레이터: SQLite 컬럼명과 TypeScript 프로퍼티를 자동으로 연결
 *   - getter/setter를 자동 생성하여 _getRaw/_setRaw를 내부적으로 처리
 *   - Babel @babel/plugin-proposal-decorators (legacy: true) 필요
 */
export class BookmarkPerformanceEntity extends Model {
  static table = 'bookmarks';

  @field('performance_id') performanceId!: string | null;
  @field('name') name!: string | null;
  @field('poster_url') posterUrl!: string | null;
  @field('start_date') startDate!: string | null;
  @field('end_date') endDate!: string | null;
  @field('facility_name') facilityName!: string | null;
}
