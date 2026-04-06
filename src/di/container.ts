import { BoxofficeRemoteDataSource } from '../data/datasource/BoxOfficeRemoteDataSource';
import { PerformanceRemoteDataSource } from '../data/datasource/performanceRemoteDataSource';
import { BookmarkLocalDataSource } from '../data/datasource/bookmarkLocalDataSource';
import { BoxofficeRepositoryImpl } from '../data/repository/BoxofficeRepositoryImpl';
import { PerformanceRepositoryImpl } from '../data/repository/PerformanceRepositoryImpl';
import { BookmarkRepositoryImpl } from '../data/repository/BookmarkRepositoryImpl';
import { BoxofficeUseCase } from '../domain/usecase/BoxofficeUseCase';
import { PerformanceUseCase } from '../domain/usecase/PerformanceUseCase';
import { PlaceUseCase } from '../domain/usecase/placeUseCase';
import { BookmarkUseCase } from '../domain/usecase/BookmarkUseCase';
import { database } from '../database';

// Hilt의 @Module/@Provides에 해당: 의존성 구현체를 생성하고 연결
const performanceRemoteDataSource = new PerformanceRemoteDataSource();
const performanceRepository = new PerformanceRepositoryImpl(
  performanceRemoteDataSource,
);

const boxofficeRemoteDataSource = new BoxofficeRemoteDataSource();
const boxofficeRepository = new BoxofficeRepositoryImpl(
  boxofficeRemoteDataSource,
);

// 북마크: 로컬 DB(WatermelonDB) → DataSource → Repository → UseCase
const bookmarkLocalDataSource = new BookmarkLocalDataSource(database);
const bookmarkRepository = new BookmarkRepositoryImpl(bookmarkLocalDataSource);

// DIContainer: 인터페이스에 의존해 테스트 시 mock으로 교체 가능
export interface DIContainer {
  performanceUseCase: PerformanceUseCase;
  boxofficeUseCase: BoxofficeUseCase;
  placeUseCase: PlaceUseCase;
  bookmarkUseCase: BookmarkUseCase;
}

// Hilt의 @Singleton에 해당: 앱 전역 단일 인스턴스
export const container: DIContainer = {
  performanceUseCase: new PerformanceUseCase(performanceRepository),
  boxofficeUseCase: new BoxofficeUseCase(boxofficeRepository),
  placeUseCase: new PlaceUseCase(performanceRepository),
  bookmarkUseCase: new BookmarkUseCase(bookmarkRepository),
};
