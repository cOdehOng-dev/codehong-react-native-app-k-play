import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type MainTabProps = {
  Home: undefined;
  MyZone: undefined;
  Favorite: undefined;
  Setting: undefined;
};

export type MainTabNavigationProp = NativeStackNavigationProp<MainTabProps>;

export type MainTabScreenProps<Screen extends keyof MainTabProps> =
  NativeStackScreenProps<MainTabProps, Screen>;
