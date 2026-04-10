import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookmarkPerformance from '../components/bookmark/BookmarkPerformance';
import MainHeader from '../components/MainHeader';
import SwipeContainer from '../components/SwipeContainer';
import { useBookmark } from '../hooks/useBookmark';
import { RootStackNavigationProp } from './stack/RootStack';

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
      <MainHeader title="북마크" />
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>저장된 북마크가 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item, index) => item.id ?? String(index)}
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
              <BookmarkPerformance item={item} />
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
  listContent: {
    paddingBottom: 15,
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
  swipeContainer: {
    position: 'relative',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
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
