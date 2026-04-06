import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DIProvider } from './di/DIContext';
import store from './store/store';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DIProvider>
          <SafeAreaProvider>
            {children}
          </SafeAreaProvider>
        </DIProvider>
      </QueryClientProvider>
    </Provider>
  );
}
