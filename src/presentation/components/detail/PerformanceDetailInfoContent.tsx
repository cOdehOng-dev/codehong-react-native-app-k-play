import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Props {
  label: string;
  value?: string | null;
}

function PerformanceDetailInfoContent({ label, value }: Props) {
  if (!value) return null;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default PerformanceDetailInfoContent;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#888888',
  },
  value: {
    fontSize: 14,
    flex: 1,
    color: '#000000',
  },
});
