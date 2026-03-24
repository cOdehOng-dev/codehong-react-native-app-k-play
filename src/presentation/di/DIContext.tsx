import React, { createContext, useContext } from 'react';
import { container, DIContainer } from './conatiner';

const DIContext = createContext<DIContainer>(container);

export const DIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <DIContext.Provider value={container}>{children}</DIContext.Provider>;

export const useDI = (): DIContainer => useContext(DIContext);
