import { BoxOfficeRemoteDataSource } from '../data/datasource/BoxOfficeRemoteDataSource';
import { PerformanceRemoteDataSource } from '../data/datasource/PerformanceRemoteDataSource';
import { BoxOfficeRepositoryImpl } from '../data/repository/BoxOfficeRepositoryImpl';
import { PerformanceRepositoryImpl } from '../data/repository/PerformanceRepositoryImpl';
import { IBoxOfficeUseCase } from '../domain/usecase/IBoxOfficeUseCase';
import { IPerformanceUseCase } from '../domain/usecase/IPerformanceUseCase';
import { BoxOfficeUseCase } from '../domain/usecase/BoxOfficeUseCase';
import { PerformanceUseCase } from '../domain/usecase/PerformanceUseCase';

// Hilt의 @Module/@Provides에 해당: 의존성 구현체를 생성하고 연결
const performanceRemoteDataSource = new PerformanceRemoteDataSource();
const performanceRepository = new PerformanceRepositoryImpl(
  performanceRemoteDataSource,
);

const boxOfficeRemoteDataSource = new BoxOfficeRemoteDataSource();
const boxOfficeRepository = new BoxOfficeRepositoryImpl(
  boxOfficeRemoteDataSource,
);

// DIContainer: 인터페이스에 의존해 테스트 시 mock으로 교체 가능
export interface DIContainer {
  performanceListUseCase: IPerformanceUseCase;
  boxOfficeListUseCase: IBoxOfficeUseCase;
}

// Hilt의 @Singleton에 해당: 앱 전역 단일 인스턴스
export const container: DIContainer = {
  performanceListUseCase: new PerformanceUseCase(performanceRepository),
  boxOfficeListUseCase: new BoxOfficeUseCase(boxOfficeRepository),
};
