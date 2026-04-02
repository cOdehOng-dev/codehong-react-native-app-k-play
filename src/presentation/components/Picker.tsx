/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

type Props = {
  visible: boolean;
  title: string;
  optionList: string[];
  selectedOptionIndex: number;
  selectorColorHex: string;
  onDismiss: () => void;
  onConfirm?: (selectOption: [number, string]) => void;
};

const ITEM_HEIGHT = 36;
const PICKER_HEIGHT = 220;
const PICKER_COLUMN_HEIGHT = PICKER_HEIGHT - 60;
const TOP_BOTTOM_PADDING = (PICKER_COLUMN_HEIGHT - ITEM_HEIGHT) / 2;

export function Picker({
  visible,
  title,
  optionList,
  selectedOptionIndex,
  selectorColorHex,
  onDismiss,
  onConfirm,
}: Props): React.ReactElement {
  const [selectedOption, setSelectedOption] = useState<[number, string]>([
    selectedOptionIndex,
    optionList[selectedOptionIndex] ?? '',
  ]);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }
  }, [visible, slideAnim]);

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="none"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        {/* Dim overlay */}
        <TouchableWithoutFeedback>
          <View style={styles.dim} />
        </TouchableWithoutFeedback>

        {/* Bottom sheet */}
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [400, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {/* Header: title + close */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              onPress={onDismiss}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Picker column */}
          <View style={styles.pickerRow}>
            <PickerColumn
              optionList={optionList}
              initialIndex={selectedOptionIndex}
              selectorColorHex={selectorColorHex}
              onSelected={(index, item) => {
                setSelectedOption([index, item]);
              }}
            />
          </View>

          {/* Confirm button */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => onConfirm?.(selectedOption)}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>선택</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ─── PickerItem ────────────────────────────────────────────────────────────

type PickerItemProps = {
  optionList: string[];
  initialIndex: number;
  selectorColorHex: string;
  onSelected: (index: number, item: string) => void;
  extraStyle?: object;
};

function PickerColumn({
  optionList,
  initialIndex,
  selectorColorHex,
  onSelected,
  extraStyle,
}: PickerItemProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: initialIndex * ITEM_HEIGHT,
        animated: false,
      });
    }, 50);
    return () => clearTimeout(timeout);
  }, [initialIndex]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.max(
      0,
      Math.min(Math.round(y / ITEM_HEIGHT), optionList.length - 1),
    );
    setSelectedIndex(index);
    onSelected(index, optionList[index] ?? '');
  };

  const handleItemPress = (index: number, item: string) => {
    scrollRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
    setSelectedIndex(index);
    onSelected(index, item);
  };

  return (
    <View style={[styles.pickerColumn, extraStyle]}>
      {/* Selector highlight */}
      <View
        style={[
          styles.selectorHighlight,
          { backgroundColor: selectorColorHex },
        ]}
      />

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={styles.scrollContent}
      >
        {optionList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.pickerItem}
            onPress={() => handleItemPress(index, item)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.pickerItemText,
                selectedIndex === index
                  ? styles.pickerItemSelected
                  : styles.pickerItemUnselected,
              ]}
              numberOfLines={1}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Top fade */}
      <View style={styles.fadeTop} pointerEvents="none" />
      {/* Bottom fade */}
      <View style={styles.fadeBottom} pointerEvents="none" />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    width: '100%',
    paddingTop: 30,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    color: '#000000',
  },
  closeIcon: {
    fontSize: 18,
    color: '#000000',
  },
  pickerRow: {
    flexDirection: 'row',
    height: PICKER_HEIGHT,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  pickerColumn: {
    flex: 1,
    height: PICKER_HEIGHT - 60,
    overflow: 'hidden',
    position: 'relative',
  },
  selectorHighlight: {
    position: 'absolute',
    top: TOP_BOTTOM_PADDING,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderRadius: 8,
    zIndex: 0,
  },
  scrollContent: {
    paddingVertical: TOP_BOTTOM_PADDING,
  },
  fadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 24,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  fadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 24,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  pickerItemText: {
    textAlign: 'center',
  },
  pickerItemSelected: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  pickerItemUnselected: {
    fontSize: 18,
    fontWeight: '400',
    color: '#80545457',
  },
  confirmButton: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8224',
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
