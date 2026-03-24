import React, { createContext, useContext } from 'react';
import { container, DIContainer } from './container';

// DI 컨테이너를 앱 전역에 공유하기 위한 React Context
// 기본값으로 싱글턴 container 인스턴스를 사용
const DIContext = createContext<DIContainer>(container);

// 앱 최상단에서 DI 컨테이너를 공급하는 Provider 컴포넌트
// 이 컴포넌트로 감싸인 하위 컴포넌트는 useDI()로 컨테이너에 접근 가능
export const DIProvider = ({ children }: { children: React.ReactNode }) => (
  <DIContext.Provider value={container}>{children}</DIContext.Provider>
);

// DI 컨테이너에 접근하기 위한 커스텀 훅
// 사용 예: const { performanceUseCase } = useDI();
export const useDI = (): DIContainer => useContext(DIContext);
