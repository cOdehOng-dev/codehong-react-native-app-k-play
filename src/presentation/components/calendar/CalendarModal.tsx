import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomSheetModal from '../BottomSheetModal';
import Calendar from './Calendar';
import { CalendarUtils } from './calendarUtils';

type Props = {
  visible: boolean;
  initialStartDate?: string;
  initialEndDate?: string;
  onConfirm: (startDate: string | null, endDate: string | null) => void;
  onDismiss: () => void;
};

const CalendarModal = ({
  visible,
  initialStartDate,
  initialEndDate,
  onConfirm,
  onDismiss,
}: Props) => {
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null,
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

  const handleConfirm = () => {
    onConfirm(selectedStartDate, selectedEndDate);
    onDismiss();
  };

  return (
    <BottomSheetModal visible={visible} onDismiss={onDismiss}>
      <View style={styles.header}>
        <Text style={styles.title}>날짜 선택</Text>
        <Pressable style={styles.closeButton} onPress={onDismiss} hitSlop={8}>
          <MaterialIcons name="close" size={24} color="#000000" />
        </Pressable>
      </View>
      <View style={styles.calendarWrapper}>
        <Calendar
          initialStartDate={initialStartDate}
          initialEndDate={initialEndDate}
          onSelected={(startDate, endDate) => {
            setSelectedStartDate(
              startDate ? CalendarUtils.dateToYYYYMMDD(startDate) : null,
            );
            setSelectedEndDate(
              endDate ? CalendarUtils.dateToYYYYMMDD(endDate) : null,
            );
          }}
        />
      </View>
      <Pressable style={styles.buttonContainer} onPress={handleConfirm}>
        <Text style={styles.buttonText}>선택</Text>
      </Pressable>
    </BottomSheetModal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
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
  calendarWrapper: {
    height: Dimensions.get('window').height * 0.55,
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
