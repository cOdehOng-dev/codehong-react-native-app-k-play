import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import DetailScreen from '../DetailScreen';
import MainTab from './MainTab';
import SearchScreen from '../SearchScreen';

export type RootStackProps = {
  MainTab: undefined;
  Detail: { performanceId: string };
  Search: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackProps>;
export type RootStackScreenProps<Screen extends keyof RootStackProps> =
  NativeStackScreenProps<RootStackProps, Screen>;

const Stack = createNativeStackNavigator<RootStackProps>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
