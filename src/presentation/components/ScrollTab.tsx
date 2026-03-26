import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

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
    onClickTab?.(index, tabList[index]);
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

          const bgColor = isSelected ? '#FF8224' : '#FFFFFF';
          const borderWidth = isSelected ? 0 : 1;
          const borderColor = isSelected ? '#00000000' : '#eaeaeaff';

          const textColorHex = isSelected ? '#FFFFFF' : '#000000';

          const itemStyle: ViewStyle = {
            backgroundColor: bgColor,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginRight: isLast ? 0 : 6,
            borderRadius: 100,
            ...(borderWidth > 0
              ? {
                  borderWidth,
                  borderColor: borderColor,
                }
              : {}),
          };

          const textStyle: TextStyle = {
            fontSize: 14,
            fontWeight: 'bold',
            color: textColorHex,
          };

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => handleTabPress(index)}
              onLayout={e => handleItemLayout(index, e)}
            >
              <View style={itemStyle}>
                <Text style={textStyle} numberOfLines={1}>
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
});
