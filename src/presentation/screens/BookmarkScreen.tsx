import React, { useCallback, useRef } from 'react';
import {
  Animated,
  FlatList,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookMarkPerformance } from '../../domain/model/bookMarkPerformance';
import { useBookmark } from '../hooks/useBookmark';

// ─────────────────────────────────────────────
// 스와이프 삭제 가능한 단일 북마크 아이템
// ─────────────────────────────────────────────
const DELETE_BUTTON_WIDTH = 80;
const SWIPE_THRESHOLD = -DELETE_BUTTON_WIDTH / 2; // 스와이프 감지 임계값

interface SwipeableItemProps {
  item: BookMarkPerformance;
  onDelete: (name: string) => void;
}

function SwipeableBookmarkItem({ item, onDelete }: SwipeableItemProps) {
  // 수평 이동 거리를 추적하는 Animated.Value
  const translateX = useRef(new Animated.Value(0)).current;
  // 현재 열려 있는지 여부 (삭제 버튼 노출 상태)
  const isOpen = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      // 수평 스와이프만 감지 (수직 스크롤과 충돌 방지)
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 5,

      onPanResponderMove: (_, gestureState) => {
        // 이미 열려 있으면 열린 위치(-DELETE_BUTTON_WIDTH)를 기준으로 이동
        const base = isOpen.current ? -DELETE_BUTTON_WIDTH : 0;
        const newX = base + gestureState.dx;
        // 오른쪽으로 넘어가거나 너무 많이 왼쪽으로 가지 않도록 제한
        if (newX <= 0 && newX >= -DELETE_BUTTON_WIDTH) {
          translateX.setValue(newX);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        const base = isOpen.current ? -DELETE_BUTTON_WIDTH : 0;
        const totalDx = base + gestureState.dx;

        if (totalDx < SWIPE_THRESHOLD) {
          // 임계값보다 많이 스와이프 → 삭제 버튼 완전 노출
          openItem();
        } else {
          // 그 외 → 원위치로 복귀
          closeItem();
        }
      },
    }),
  ).current;

  const openItem = () => {
    Animated.spring(translateX, {
      toValue: -DELETE_BUTTON_WIDTH,
      useNativeDriver: true,
    }).start();
    isOpen.current = true;
  };

  const closeItem = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    isOpen.current = false;
  };

  return (
    <View style={styles.swipeContainer}>
      {/* 삭제 버튼 - 아이템 우측에 고정 */}
      <View style={styles.deleteButtonContainer}>
        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(item.name ?? '')}
        >
          <Text style={styles.deleteButtonText}>삭제</Text>
        </Pressable>
      </View>

      {/* 스와이프 가능한 아이템 카드 */}
      <Animated.View
        style={[styles.itemCard, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        {/* 포스터 이미지 */}
        {item.posterUrl ? (
          <Image
            style={styles.poster}
            source={{ uri: item.posterUrl }}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.poster, styles.posterPlaceholder]} />
        )}

        {/* 공연 정보 */}
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
      </Animated.View>
    </View>
  );
}

// ─────────────────────────────────────────────
// BookmarkScreen
// ─────────────────────────────────────────────
function BookmarkScreen() {
  const { bookmarks, removeBookmark, loadBookmarks } = useBookmark();

  // 탭 이동 등으로 화면이 포커스될 때마다 DB에서 최신 북마크를 다시 로드
  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [loadBookmarks]),
  );

  const renderItem = ({ item }: { item: BookMarkPerformance }) => (
    <SwipeableBookmarkItem
      item={item}
      onDelete={name => removeBookmark(name)}
    />
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
          renderItem={renderItem}
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
  deleteButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DELETE_BUTTON_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    borderRadius: 12,
  },
  deleteButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // ── 아이템 카드 ──
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
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
});
