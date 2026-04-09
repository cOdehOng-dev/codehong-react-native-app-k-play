import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

type Props<T> = {
  pageInfoList?: T[] | null;
  // Kotlin: Pair<Boolean, Boolean> — [forwardInfinite, backwardInfinite]
  // 둘 중 하나라도 true면 리스트를 10배 복제하여 무한 스크롤 구현
  infiniteScroll?: [boolean, boolean];
  // 현재 페이지 인덱스 콜백 (원본 리스트 기준 index)
  currentIndex?: (index: number) => void;
  // 0이면 자동 스크롤 없음
  autoScrollMillSecond?: number;
  // Kotlin: beyondViewportPageCount — 미리 렌더할 페이지 수 (현재 RN에선 FlatList windowSize로 대응)
  initialLoadPageSize?: number;
  prevPageVisibleWidth?: number;
  nextPageVisibleWidth?: number;
  pageSpacing?: number;
  content: (item: T) => React.ReactElement;
};

export function BannerPager<T>({
  pageInfoList,
  infiniteScroll,
  autoScrollMillSecond = 0,
  initialLoadPageSize = 0,
  prevPageVisibleWidth = 0,
  nextPageVisibleWidth = 0,
  pageSpacing = 0,
  content,
  currentIndex,
}: Props<T>) {
  const pageList = pageInfoList ?? [];

  const isInfinite = infiniteScroll?.[0] || infiniteScroll?.[1];

  // Kotlin: List(10) { pageList }.flatten()
  const finalList: T[] = isInfinite
    ? Array.from({ length: 10 }, () => pageList).flat()
    : pageList;

  const finalPageSize = finalList.length;

  const scrollRef = useRef<ScrollView>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  // 무한 스크롤 시 중간(5번째 복제본)에서 시작
  const currentPageRef = useRef(isInfinite ? pageList.length * 5 : 0);

  const pageWidth = Math.max(
    0,
    containerWidth - prevPageVisibleWidth! - nextPageVisibleWidth!,
  );
  const snapInterval = pageWidth + pageSpacing!;

  const scrollToPage = useCallback(
    (page: number, animated = true) => {
      if (snapInterval <= 0) return;
      scrollRef.current?.scrollTo({ x: page * snapInterval, animated });
    },
    [snapInterval],
  );

  // 무한 스크롤 초기 위치 세팅
  useEffect(() => {
    if (isInfinite && containerWidth > 0) {
      scrollToPage(pageList.length * 5, false);
    }
  }, [containerWidth]);

  // Kotlin: LaunchedEffect(Unit) { while(true) { delay(...); animateScrollToPage(...) } }
  useEffect(() => {
    if (autoScrollMillSecond! <= 0 || containerWidth <= 0) return;

    const timer = setInterval(() => {
      const next = currentPageRef.current + 1;
      const nextPage = isInfinite ? next : Math.min(next, finalPageSize - 1);
      currentPageRef.current = nextPage;
      scrollToPage(nextPage);
    }, autoScrollMillSecond!);

    return () => clearInterval(timer);
  }, [
    autoScrollMillSecond,
    containerWidth,
    isInfinite,
    finalPageSize,
    scrollToPage,
  ]);

  const handleLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (snapInterval <= 0) return;
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / snapInterval);
    currentPageRef.current = page;
    currentIndex?.(page % pageList.length);
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {containerWidth > 0 && (
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={snapInterval}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: prevPageVisibleWidth }}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
        >
          {finalList.map((item, index) => (
            <View
              key={index}
              style={[
                { width: pageWidth },
                index < finalPageSize - 1 && { marginRight: pageSpacing },
              ]}
            >
              {content(item)}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export default BannerPager;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
