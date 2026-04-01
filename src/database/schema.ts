import { appSchema, tableSchema } from '@nozbe/watermelondb';

/**
 * WatermelonDB 전체 앱 스키마 정의
 * - Android: SQLite, iOS: SQLite(JSI) 또는 SQLite 파일
 * - 스키마 버전이 올라가면 마이그레이션 필요 (현재는 최초 버전 1)
 */
export const bookmarkSchema = appSchema({
  version: 1,
  tables: [
    /**
     * bookmarks 테이블
     * - WatermelonDB가 자동으로 id, _changed, _status 컬럼을 추가함
     */
    tableSchema({
      name: 'bookmarks',
      columns: [
        // isOptional: true → null 허용 (BookMarkPerformance 필드가 optional이므로)
        { name: 'name', type: 'string', isOptional: true },
        { name: 'poster_url', type: 'string', isOptional: true },
        { name: 'start_date', type: 'string', isOptional: true },
        { name: 'end_date', type: 'string', isOptional: true },
        { name: 'facility_name', type: 'string', isOptional: true },
      ],
    }),
  ],
});
