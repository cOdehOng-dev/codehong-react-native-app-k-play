import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Calendar from './Calendar';
import { CalendarUtils } from './calendarUtils';

type Props = {
  visible: boolean;
  onConfirm: (startDate: string | null, endDate: string | null) => void;
  onDismiss: () => void;
};

const BORDER_RADIUS = 20;
const SHEET_HEIGHT = Dimensions.get('window').height * 0.85;

// ─── iOS: presentationStyle="pageSheet" 사용 ────────────────────────────────
// iOS 네이티브가 dim + slide-up 애니메이션을 직접 처리
const IOSCalendarModal = ({ visible, onConfirm, onDismiss }: Props) => {
  const { bottom } = useSafeAreaInsets();

  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null,
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

  const handleConfirm = () => {
    onConfirm(selectedStartDate, selectedEndDate);
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onDismiss}
    >
      <View style={[styles.sheet, styles.iosSheet, { paddingBottom: bottom }]}>
        <View style={styles.header}>
          <Text style={styles.title}>날짜 선택</Text>
          <Pressable style={styles.closeButton} onPress={onDismiss} hitSlop={8}>
            <MaterialIcons name="close" size={24} color="#000000" />
          </Pressable>
        </View>
        <Calendar
          onSelected={(startDate, endDate) => {
            setSelectedStartDate(
              startDate ? CalendarUtils.dateToYYYYMMDD(startDate) : null,
            );
            setSelectedEndDate(
              endDate ? CalendarUtils.dateToYYYYMMDD(endDate) : null,
            );
          }}
        />
        <Pressable style={styles.buttonContainer} onPress={handleConfirm}>
          <Text style={styles.buttonText}>선택</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

// ─── Android: animationType="none" + Animated로 직접 처리 ────────────────────
// transparent Modal + useNativeDriver로 네이티브 스레드에서 애니메이션 실행
const AndroidCalendarModal = ({ visible, onConfirm, onDismiss }: Props) => {
  const { bottom } = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null,
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

  const handleConfirm = () => {
    onConfirm(selectedStartDate, selectedEndDate);
    onDismiss();
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SHEET_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, overlayOpacity]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      hardwareAccelerated
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      {/* dim 레이어 - 별도 Animated로 fade */}
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <Pressable style={styles.overlayPressable} onPress={onDismiss} />
      </Animated.View>

      {/* 시트 - translateY로 slide-up */}
      <Animated.View
        style={[
          styles.sheet,
          styles.androidSheet,
          { paddingBottom: bottom, transform: [{ translateY }] },
        ]}
      >
        <View style={styles.handle} />
        <View style={styles.header}>
          <Text style={styles.title}>날짜 선택</Text>
          <Pressable style={styles.closeButton} onPress={onDismiss} hitSlop={8}>
            <MaterialIcons name="close" size={24} color="#000000" />
          </Pressable>
        </View>
        <Calendar
          onSelected={(startDate, endDate) => {
            setSelectedStartDate(
              startDate ? CalendarUtils.dateToYYYYMMDD(startDate) : null,
            );
            setSelectedEndDate(
              endDate ? CalendarUtils.dateToYYYYMMDD(endDate) : null,
            );
          }}
        />
        <Pressable style={styles.buttonContainer} onPress={handleConfirm}>
          <Text style={styles.buttonText}>선택</Text>
        </Pressable>
      </Animated.View>
    </Modal>
  );
};

// ─── 진입점 ──────────────────────────────────────────────────────────────────
// Platform.OS는 런타임에 바뀌지 않으므로 컴포넌트를 분리해도 hook 순서 문제 없음
const CalendarModal = (props: Props) => {
  if (Platform.OS === 'ios') {
    return <IOSCalendarModal {...props} />;
  }
  return <AndroidCalendarModal {...props} />;
};

export default CalendarModal;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  iosSheet: {
    flex: 1,
  },
  androidSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  overlayPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    backgroundColor: '#FF8224FF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
