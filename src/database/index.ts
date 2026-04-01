import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { bookmarkSchema } from './schema';
import { BookmarkPerformanceEntity } from '../data/model/bookmark/BookmarkPerformanceEntity';
import { Platform } from 'react-native';

/**
 * SQLite 어댑터 생성
 * - 네이티브 SQLite 브리지와 연결
 * - jsi: true → JSI(JavaScript Interface) 모드로 동기 네이티브 호출 가능 (Android/iOS 모두 지원)
 *   JSI가 지원되지 않는 환경에서는 자동으로 AsyncStorage 방식으로 폴백됨
 */
const adapter = new SQLiteAdapter({
  schema: bookmarkSchema,
  // 마이그레이션이 필요한 경우: migrations 파라미터 추가
  // migrations: bookmarkMigrations,
  // jsi: true 는 JSI 동기 모드 (성능 우수하지만 simdjson 네이티브 빌드 필요)
  // false 로 설정하면 async 브리지 모드로 동작 (더 넓은 호환성)
  dbName: 'AppDatabase',
  jsi: Platform.OS === 'ios', // iOS는 JSI로 동기 고속 처리
  onSetUpError: error => {
    // 어댑터 초기화 실패 시 처리 (앱 재시작 유도 등)
    console.error('[WatermelonDB] SQLite 어댑터 초기화 실패:', error);
  },
});

/**
 * Database 싱글턴 인스턴스
 * - 앱 전역에서 단 하나의 DB 인스턴스를 공유
 * - Android: Module Singleton과 동일한 개념
 * - modelClasses: 등록된 Model 클래스 목록 (스키마의 테이블과 1:1 매핑)
 */
export const database = new Database({
  adapter,
  modelClasses: [BookmarkPerformanceEntity],
});
