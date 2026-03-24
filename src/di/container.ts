import { PerformanceRemoteDataSource } from '../data/datasource/PerformanceRemoteDataSource';
import { PerformanceRepositoryImpl } from '../data/repository/PerformanceRepositoryImpl';
import { PerformanceUseCase } from '../domain/usecase/PerformanceUseCase';

const performanceRemoteDataSource = new PerformanceRemoteDataSource();
const performanceRepository = new PerformanceRepositoryImpl(
  performanceRemoteDataSource,
);

export const container = {
  performanceListUseCase: new PerformanceUseCase(performanceRepository),
};

export type DIContainer = typeof container;
