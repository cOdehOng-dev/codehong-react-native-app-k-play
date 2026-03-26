import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FavoriteScreen from '../FavoriteScreen';
import HomeScreen from '../HomeScreen';
import MyZoneScreen from '../MyZoneScreen';
import SettingScreen from '../SettingScreen';
import { MainTabProps } from './StackProps';

const Tab = createBottomTabNavigator<MainTabProps>();

const ICON_SIZE = 20;

function getTabIcon(materialName: string) {
  return ({ color }: { color: string }) => (
    <MaterialIcons name={materialName} size={ICON_SIZE} color={color} />
  );
}

function MainTab() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF8224',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: { height: 58 + bottom, paddingBottom: bottom },
        tabBarItemStyle: { paddingBottom: 0 },
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
          tabBarIcon: getTabIcon('home'),
        }}
      />
      <Tab.Screen
        name="MyZone"
        component={MyZoneScreen}
        options={{
          headerShown: false,
          tabBarLabel: '내주변',
          tabBarIcon: getTabIcon('location-on'),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarLabel: '찜',
          tabBarIcon: getTabIcon('favorite'),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: '설정',
          tabBarIcon: getTabIcon('settings'),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
