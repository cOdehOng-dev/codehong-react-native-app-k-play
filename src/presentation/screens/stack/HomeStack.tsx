import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import DetailScreen from '../DetailScreen';

export type HomeStackProps = {
  Detail: { id: number };
};

export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackProps>;
export type HomeStackScreenProps<Screen extends keyof HomeStackProps> =
  NativeStackScreenProps<HomeStackProps, Screen>;

const Stack = createNativeStackNavigator<HomeStackProps>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
