import React, { useRef } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
interface Props {
  children: React.ReactNode;
  childrenViewStyle: ViewStyle;
  index: number;
  buttonContainerViewStyle?: ViewStyle | null;
  buttonViewStyle?: ViewStyle | null;
  buttonTextStyle?: TextStyle | null;
  buttonText?: string | null;
  onClickItem: (index: number) => void;
  onClickButton: (index: number) => void;
}
const BUTTON_WIDTH = 80;
const SWIPE_THRESHOLD = -BUTTON_WIDTH / 2; // 스와이프 감지 임계값

export default function SwipeContainer({
  children,
  childrenViewStyle,
  buttonContainerViewStyle,
  buttonViewStyle,
  buttonTextStyle,
  buttonText,
  index,
  onClickItem,
  onClickButton,
}: Props) {
  // 수평 이동 거리를 추적하는 Animated.Value
  const translateX = useRef(new Animated.Value(0)).current;
  // 현재 열려 있는지 여부 (삭제 버튼 노출 상태)
  const isOpen = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      // 수평 스와이프만 감지 (수직 스크롤과 충돌 방지)
      // 수평 이동 > 5px :: 미세한 떨림은 무시
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 5,

      onPanResponderMove: (_, gestureState) => {
        // 이미 열려 있으면 열린 위치(-DELETE_BUTTON_WIDTH)를 기준으로 이동
        const base = isOpen.current ? -BUTTON_WIDTH : 0;
        const newX = base + gestureState.dx;
        // 오른쪽으로 넘어가거나 너무 많이 왼쪽으로 가지 않도록 제한
        if (newX <= 0 && newX >= -BUTTON_WIDTH) {
          translateX.setValue(newX);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        const base = isOpen.current ? -BUTTON_WIDTH : 0;
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
      toValue: -BUTTON_WIDTH,
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
      <View
        style={[
          buttonContainerViewStyle ?? styles.defButtonContainer,
          { width: BUTTON_WIDTH },
        ]}
      >
        <Pressable
          style={buttonViewStyle ?? styles.defButton}
          onPress={() => onClickButton(index ?? '')}
        >
          <Text style={buttonTextStyle ?? styles.defButtonText}>
            {buttonText ?? '삭제'}
          </Text>
        </Pressable>
      </View>

      {/* 스와이프 가능한 아이템 카드 */}
      <Animated.View
        style={{ transform: [{ translateX }] }}
        {...panResponder.panHandlers}
      >
        <Pressable style={childrenViewStyle} onPress={() => onClickItem(index)}>
          {children}
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  swipeContainer: {
    position: 'relative',
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden',
  },
  defButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: BUTTON_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
  },
  defButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
