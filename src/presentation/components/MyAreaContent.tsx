import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import { PerformanceInfoItem } from '../../domain/model/PerformanceInfoItem';
import PerformanceInfoContent from './PerformanceInfoContent';
import PerformanceInfoSkeleton from './skeleton/PerformanceInfoSkeleton';

type Props = {
  currentMonth: string;
  myAreaList: PerformanceInfoItem[];
  loading: boolean;
  onClickRefresh: () => void;
};

function MyAreaContent({
  currentMonth,
  myAreaList,
  loading,
  onClickRefresh,
}: Props) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleRefresh = () => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    onClickRefresh();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.block}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{currentMonth}월 내 주변 공연이에요</Text>
        <Pressable onPress={handleRefresh}>
          <Animated.Image
            source={require('../../assets/images/ic_34_refresh.png')}
            style={[styles.refreshIcon, { transform: [{ rotate }] }]}
          />
        </Pressable>
      </View>
      {loading ? (
        <View style={[styles.mt, styles.skeletonContainer]}>
          {Array.from({ length: 4 }).map((_, i) => (
            <PerformanceInfoSkeleton key={i} />
          ))}
        </View>
      ) : (
        <FlatList
          style={styles.mt}
          contentContainerStyle={styles.listContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={myAreaList}
          renderItem={({ item }) => (
            <PerformanceInfoContent item={item} onClick={() => {}} />
          )}
          keyExtractor={(item, index) => item.id ?? String(index)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  mt: {
    marginTop: 14,
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 16,
  },
  refreshIcon: {
    width: 18,
    height: 18,
  },
  skeletonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
});

export default MyAreaContent;
