import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import React from 'react';

import BookmarkScreen from '../BookmarkScreen';
import HomeScreen from '../HomeScreen';
import MyZoneScreen from '../MyZoneScreen';
import SettingScreen from '../SettingScreen';
import { MainTabProps } from './MainTabProps';

const Tab = createNativeBottomTabNavigator<MainTabProps>();

function getTabIcon(sfSymbol: string) {
  return { type: 'sfSymbol' as const, name: sfSymbol as any };
}

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF8224',
        tabBarInactiveTintColor: '#000000',
        tabBarActiveIndicatorEnabled: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
          tabBarIcon: getTabIcon('house.fill'),
        }}
      />
      <Tab.Screen
        name="MyZone"
        component={MyZoneScreen}
        options={{
          headerShown: false,
          tabBarLabel: '내주변',
          tabBarIcon: getTabIcon('location.fill'),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={BookmarkScreen}
        options={{
          headerShown: false,
          tabBarLabel: '찜',
          tabBarIcon: getTabIcon('heart.fill'),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: '설정',
          tabBarIcon: getTabIcon('gearshape.fill'),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
