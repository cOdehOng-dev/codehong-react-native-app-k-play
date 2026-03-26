/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DIProvider } from './src/di/DIContext';
import RootStack from './src/presentation/screens/stack/RootStack';

function App() {
  return (
    <DIProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </DIProvider>
  );
}
export default App;
