import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  topBar?: React.ReactNode; // 상단 앱바
  bottomBar?: React.ReactNode; // 하단 탭바
  floating?: React.ReactNode; // FAB
  children: React.ReactNode;
  backgroundColor?: string;
}

export function RootContainer({
  topBar,
  bottomBar,
  floating,
  children,
  backgroundColor = '#fff',
}: Props) {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor }]}
      edges={Platform.OS === 'ios' ? ['top', 'left', 'right'] : undefined}
    >
      {topBar && <View>{topBar}</View>}

      <View style={styles.content}>{children}</View>

      {floating && <View style={styles.fab}>{floating}</View>}

      {bottomBar && <View>{bottomBar}</View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});
