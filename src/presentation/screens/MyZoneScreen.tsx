import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

function MyZoneScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }} />
    </SafeAreaView>
  );
}

export default MyZoneScreen;

const styles = StyleSheet.create({});
