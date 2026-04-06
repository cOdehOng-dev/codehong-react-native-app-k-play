import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AppProviders } from './src/AppProviders';
import RootStack from './src/presentation/screens/stack/RootStack';

function App() {
  return (
    <AppProviders>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <RootStack />
      </NavigationContainer>
    </AppProviders>
  );
}

export default App;
