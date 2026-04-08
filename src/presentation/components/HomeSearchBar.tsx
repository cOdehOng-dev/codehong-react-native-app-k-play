import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../screens/stack/RootStack';

const HomeSearchBar = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <Pressable onPress={() => navigation.navigate('Search')}>
      <View style={styles.root}>
        <View style={styles.container}>
          <MaterialIcons name="search" size={22} color="#FF8224" />
          <Text style={styles.text}>찾고 싶은 공연, 배우를 검색해보세요</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default HomeSearchBar;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    height: 40,
    backgroundColor: '#5454570D',
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#54545780',
  },
});
