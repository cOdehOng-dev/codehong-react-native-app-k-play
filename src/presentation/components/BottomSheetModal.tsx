import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  Modal as RNModal,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  visible: boolean;
  topRadius?: number;
  isClickDimDismiss?: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
};

const IOSModal = ({
  visible,
  topRadius = 20,
  isClickDimDismiss = true,
  onDismiss,
  children,
}: Props) => {
  const { bottom } = useSafeAreaInsets();
  const [mounted, setMounted] = useState(visible);
  const dimAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const slideAnim = useRef(new Animated.Value(visible ? 0 : 600)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.timing(dimAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(dimAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 600,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [visible, dimAnim, slideAnim]);

  return (
    <RNModal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
    >
      <View style={styles.iosContainer}>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.dim, { opacity: dimAnim }]}
          pointerEvents="none"
        />
        {isClickDimDismiss && (
          <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />
        )}
        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: bottom,
              borderTopLeftRadius: topRadius,
              borderTopRightRadius: topRadius,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
};

const AndroidModal = ({
  visible,
  topRadius = 20,
  isClickDimDismiss = true,
  onDismiss,
  children,
}: Props) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <>
      <RNModal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={onDismiss}
      >
        <Pressable
          style={styles.dim}
          onPress={isClickDimDismiss ? onDismiss : undefined}
        />
      </RNModal>

      <RNModal
        visible={visible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={onDismiss}
      >
        <View style={styles.androidContainer}>
          {isClickDimDismiss && (
            <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />
          )}
          <View
            style={[
              styles.sheet,
              {
                paddingBottom: bottom,
                borderTopLeftRadius: topRadius,
                borderTopRightRadius: topRadius,
              },
            ]}
          >
            <View style={styles.handle} />
            {children}
          </View>
        </View>
      </RNModal>
    </>
  );
};

const BottomSheetModal = (props: Props) => {
  if (Platform.OS === 'ios') {
    return <IOSModal {...props} />;
  }
  return <AndroidModal {...props} />;
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  dim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  iosContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  androidContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  androidSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // height: SHEET_HEIGHT,
  },
  handle: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d0d0d0',
  },
});
