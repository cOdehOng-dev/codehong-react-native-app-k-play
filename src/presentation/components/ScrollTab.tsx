import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { startTransition, useEffect, useRef, useState } from 'react';

type Props = {
  initialSelectIndex: number;
  tabList: any[];
  tabTextList: string[];
  onClickTab?: (index: number, tabText: string) => void;
};

function ScrollTab({
  initialSelectIndex,
  tabList,
  tabTextList,
  onClickTab,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectIndex);
  const scrollViewRef = useRef<ScrollView>(null);
  const containerWidth = useRef(0);
  const itemLayouts = useRef<{ x: number; width: number }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCenter(selectedIndex);
    }, 200);
    return () => clearTimeout(timer);
  }, [selectedIndex]);

  const scrollToCenter = (index: number) => {
    const layout = itemLayouts.current[index];
    if (!layout || !scrollViewRef.current) return;
    const scrollX = layout.x - (containerWidth.current - layout.width) / 2;
    scrollViewRef.current.scrollTo({ x: Math.max(0, scrollX), animated: true });
  };

  const handleTabPress = (index: number) => {
    setSelectedIndex(index);
    startTransition(() => {
      onClickTab?.(index, tabList[index]);
    });
  };

  const handleItemLayout = (index: number, e: LayoutChangeEvent) => {
    itemLayouts.current[index] = {
      x: e.nativeEvent.layout.x,
      width: e.nativeEvent.layout.width,
    };
  };

  return (
    <View
      style={styles.block}
      onLayout={e => {
        containerWidth.current = e.nativeEvent.layout.width;
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabTextList.map((text, index) => {
          const isSelected = index === selectedIndex;
          const isLast = index === tabTextList.length - 1;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => handleTabPress(index)}
              onLayout={e => handleItemLayout(index, e)}
            >
              <View
                style={[
                  styles.tabItem,
                  isLast ? null : styles.tabItemMargin,
                  isSelected
                    ? styles.tabItemSelected
                    : styles.tabItemUnselected,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    isSelected
                      ? styles.tabTextSelected
                      : styles.tabTextUnselected,
                  ]}
                  numberOfLines={1}
                >
                  {text}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default ScrollTab;

const styles = StyleSheet.create({
  block: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  tabItemMargin: {
    marginRight: 6,
  },
  tabItemSelected: {
    backgroundColor: '#FF8224',
  },
  tabItemUnselected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#eaeaeaff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabTextSelected: {
    color: '#FFFFFF',
  },
  tabTextUnselected: {
    color: '#000000',
  },
});
