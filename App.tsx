import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DIProvider } from './src/di/DIContext';
import RootStack from './src/presentation/screens/stack/RootStack';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DIProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <RootStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </DIProvider>
    </QueryClientProvider>
  );
}
export default App;
