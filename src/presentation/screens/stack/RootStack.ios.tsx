import React from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../HomeScreen';
import FavoriteScreen from '../FavoriteScreen';
import MyZoneScreen from '../MyZoneScreen';
import SettingScreen from '../SettingScreen';

export type RootStackProps = {
  Home: undefined;
  MyZone: undefined;
  Favorite: undefined;
  Setting: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackProps>;

export type RootStackScreenProps<Screen extends keyof RootStackProps> =
  NativeStackScreenProps<RootStackProps, Screen>;

const Stack = createNativeBottomTabNavigator<RootStackProps>();

function getTabIcon(sfSymbol: string) {
  return { type: 'sfSymbol' as const, name: sfSymbol as any };
}

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF8224',
        tabBarInactiveTintColor: '#000000',
        tabBarActiveIndicatorEnabled: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
          tabBarIcon: getTabIcon('house.fill'),
        }}
      />
      <Stack.Screen
        name="MyZone"
        component={MyZoneScreen}
        options={{
          headerShown: false,
          tabBarLabel: '내주변',
          tabBarIcon: getTabIcon('location.fill'),
        }}
      />
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarLabel: '찜',
          tabBarIcon: getTabIcon('heart.fill'),
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: '설정',
          tabBarIcon: getTabIcon('gearshape.fill'),
        }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
