import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  recentKeywordList: string[];
  onSearch: (keyword: string) => void;
  onRemove: (keyword: string) => void;
  onClearAll: () => void;
};

const RecentKeyword = ({
  recentKeywordList,
  onSearch,
  onRemove,
  onClearAll,
}: Props) => {
  return (
    <ScrollView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>최근 검색</Text>
        <Pressable style={styles.claerAllContainer} onPress={onClearAll}>
          <Text style={styles.clearAll}>전체 삭제</Text>
        </Pressable>
      </View>
      {recentKeywordList.map(keyword => (
        <View key={keyword} style={styles.keywordRow}>
          <Pressable onPress={() => onSearch(keyword)}>
            <Text style={styles.keyword}>{keyword}</Text>
          </Pressable>
          <Pressable
            onPress={() => onRemove(keyword)}
            style={styles.removeButton}
          >
            <Text style={styles.removeText}>✕</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

export default RecentKeyword;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  claerAllContainer: {
    width: 60,
    height: 30,
    justifyContent: 'center',
  },
  clearAll: {
    fontSize: 13,
    color: '#545457',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  keywordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  keyword: {
    fontSize: 13,
    color: '#545457',
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  removeText: {
    fontSize: 12,
    color: '#9E9E9E',
  },
});
