import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwipeContainer from '../components/SwipeContainer';
import { useBookmark } from '../hooks/useBookmark';
import { RootStackNavigationProp } from './stack/RootStack';

// ─────────────────────────────────────────────
// BookmarkScreen
// ─────────────────────────────────────────────
function BookmarkScreen() {
  const { bookmarks, removeBookmark, loadBookmarks } = useBookmark();
  const navigation = useNavigation<RootStackNavigationProp>();

  // 탭 이동 등으로 화면이 포커스될 때마다 DB에서 최신 북마크를 다시 로드
  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [loadBookmarks]),
  );

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.header}>북마크</Text>
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>저장된 북마크가 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item, index) => item.name ?? String(index)}
          renderItem={({ item, index }) => (
            <SwipeContainer
              index={index}
              childrenViewStyle={styles.itemCard}
              buttonContainerViewStyle={styles.buttonContainer}
              onClickButton={() => removeBookmark(item.id ?? '')}
              onClickItem={() =>
                navigation.navigate('Detail', {
                  performanceId: item.id ?? '',
                })
              }
            >
              {item.posterUrl ? (
                <Image
                  style={styles.poster}
                  source={{ uri: item.posterUrl }}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.poster, styles.posterPlaceholder]} />
              )}
              <View style={styles.infoContainer}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.name ?? '-'}
                </Text>
                <Text style={styles.itemDate}>
                  {item.startDate} ~ {item.endDate}
                </Text>
                <Text style={styles.itemFacility} numberOfLines={1}>
                  {item.facilityName ?? '-'}
                </Text>
              </View>
            </SwipeContainer>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

export default BookmarkScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  // ── 스와이프 컨테이너 ──
  swipeContainer: {
    position: 'relative',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
  },
  // ── 아이템 카드 ──
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    alignItems: 'center',
  },
  poster: {
    width: 72,
    height: 96,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  posterPlaceholder: {
    backgroundColor: '#E0E0E0',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  itemDate: {
    fontSize: 12,
    color: '#757575',
  },
  itemFacility: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
  },
});
