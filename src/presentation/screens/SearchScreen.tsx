import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IndicatorProgress from '../components/IndicatorProgress';
import RecentKeyword from '../components/search/RecentKeyword';
import SearchBar from '../components/search/SearchBar';
import SearchItem from '../components/search/SearchItem';
import { useSearchViewModel } from '../mvi/search/useSearchViewModel';

const SearchScreen = () => {
  const {
    state,
    onAction,
    searchResultList,
    isSearchResultListLoading,
    isEmptyInputKeyword,
    hasRecentKeyword,
    remove,
    clearAllRecentKeyword,
  } = useSearchViewModel();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <SearchBar
        keyword={state.inputKeyword}
        onChangeText={keyword => {
          onAction({ type: 'SET_INPUT_KEYWORD', payload: keyword });
          if (keyword.length === 0) {
            onAction({ type: 'SET_KEYWORD', payload: '' });
          }
        }}
        onSearch={keyword => {
          onAction({ type: 'SET_KEYWORD', payload: keyword });
        }}
      />
      {isEmptyInputKeyword ? (
        // 입력값 없음 → 최근 검색어 (없으면 빈 View)
        hasRecentKeyword ? (
          <RecentKeyword
            recentKeywordList={state.recentKeywordList}
            onSearch={keyword => {
              onAction({ type: 'SET_INPUT_KEYWORD', payload: keyword });
              onAction({ type: 'SET_KEYWORD', payload: keyword });
            }}
            onRemove={remove}
            onClearAll={clearAllRecentKeyword}
          />
        ) : (
          <View />
        )
      ) : isSearchResultListLoading ? (
        <IndicatorProgress />
      ) : searchResultList.length > 0 ? (
        // 입력값 있음 + 결과 있음 → 검색 결과
        <FlatList
          data={searchResultList}
          renderItem={({ item }) => <SearchItem item={item} />}
          keyExtractor={(item, index) => item.id ?? String(index)}
        />
      ) : state.keyword.length > 0 ? (
        // 검색 제출 후 결과 없음 → 빈 상태
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>검색 결과가 없어요.</Text>
        </View>
      ) : // 타이핑 중 결과 없음 → 최근 검색어 (없으면 빈 View)
      hasRecentKeyword ? (
        <RecentKeyword
          recentKeywordList={state.recentKeywordList}
          onSearch={keyword => {
            onAction({ type: 'SET_KEYWORD', payload: keyword });
          }}
          onRemove={remove}
          onClearAll={clearAllRecentKeyword}
        />
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
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
});

export default SearchScreen;
