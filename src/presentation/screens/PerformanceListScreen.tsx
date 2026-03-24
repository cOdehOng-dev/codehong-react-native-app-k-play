import React from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { usePerformanceList } from '../hooks/usePerformanceList';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KOKOR_CLIENT_ID } from '@env';

const PerformanceItem = ({ item }: { item: PerformanceInfoItem }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.name}</Text>
    <Text style={styles.meta}>
      📅 {item.startDate} ~ {item.endDate}
    </Text>
    <Text style={styles.meta}>🏛 {item.area}</Text>
    <Text style={styles.meta}>🎭 {item.genre}</Text>
    <Text
      style={[
        styles.state,
        item.state === '공연중' ? styles.ongoing : styles.ended,
      ]}
    >
      {item.state}
    </Text>
  </View>
);

export const PerformanceListScreen = () => {
  const { performances, loading, error, fetch } = usePerformanceList();

  const handleFetch = () => {
    fetch({
      service: KOKOR_CLIENT_ID,
      startDate: '20260301',
      endDate: '20260331',
      currentPage: '1',
      rowsPerPage: '10',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="공연 목록 불러오기" onPress={handleFetch} />

      {loading && <ActivityIndicator style={styles.mt} size="large" />}

      {error && <Text style={styles.error}>❌ {error}</Text>}

      {!loading && !error && performances.length === 0 && (
        <Text style={styles.empty}>공연 데이터가 없습니다.</Text>
      )}

      <FlatList
        data={performances}
        keyExtractor={(item, index) => item.id ?? String(index)}
        renderItem={({ item }) => <PerformanceItem item={item} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  mt: { marginTop: 20 },
  error: { color: 'red', marginTop: 16, textAlign: 'center' },
  empty: { marginTop: 24, textAlign: 'center', color: '#999' },
  list: { paddingTop: 16 },
  card: {
    padding: 14,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    borderLeftWidth: 4,
    borderLeftColor: '#6c63ff',
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  meta: { fontSize: 13, color: '#555', marginBottom: 2 },
  state: { marginTop: 6, fontSize: 12, fontWeight: '600' },
  ongoing: { color: '#2e7d32' },
  ended: { color: '#999' },
});
