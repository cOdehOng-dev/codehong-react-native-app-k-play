import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';

function SettingScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <MainHeader title="설정" />
    </SafeAreaView>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
