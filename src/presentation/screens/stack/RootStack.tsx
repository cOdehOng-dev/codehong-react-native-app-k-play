import React from 'react';
import { Platform } from 'react-native';
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
import { PerformanceListScreen } from '../PerformanceListScreen';

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

const ICON_SIZE = 20;
const ICON_COLOR = '#000000';

function getTabIcon(sfSymbol: string, materialName: string) {
  if (Platform.OS === 'ios') {
    return { type: 'sfSymbol' as const, name: sfSymbol as any };
  }
  return {
    type: 'image' as const,
    source: MaterialIcons.getImageSourceSync(
      materialName,
      ICON_SIZE,
      ICON_COLOR,
    ),
  };
}

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarLabelVisibilityMode: 'labeled',
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
          title: '홈',
          tabBarIcon: getTabIcon('house.fill', 'home'),
        }}
      />
      <Stack.Screen
        name="MyZone"
        component={PerformanceListScreen}
        options={{
          headerShown: false,
          title: '내주변',
          tabBarIcon: getTabIcon('location.fill', 'location-on'),
        }}
      />
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          title: '찜',
          tabBarIcon: getTabIcon('heart.fill', 'favorite'),
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
          title: '설정',
          tabBarIcon: getTabIcon('gearshape.fill', 'settings'),
        }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
