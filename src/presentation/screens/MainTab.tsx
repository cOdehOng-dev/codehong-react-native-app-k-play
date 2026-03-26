import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RootStack from './stack/RootStack';
import FavoriteScreen from './FavoriteScreen';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <View style={styles.block}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FF8224',
          headerShown: false,
          tabBarShowLabel: true,
        }}
      >
        <Tab.Screen name="홈" component={RootStack} />
        <Tab.Screen name="찜" component={FavoriteScreen} />
      </Tab.Navigator>
    </View>
  );
}

export default MainTab;

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});
