import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Utils } from '../utils';

type Props = {
  startDate: string;
  endDate: string;
  onClickDateChange: () => void;
};
const ChangeDateButton = ({ startDate, endDate, onClickDateChange }: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.dateText}>
        {Utils.formatDateRangeDisplay(startDate, endDate)}
      </Text>
      <Pressable style={styles.changeButton} onPress={onClickDateChange}>
        <Text style={styles.changeButtonText}>날짜 변경</Text>
      </Pressable>
    </View>
  );
};

export default ChangeDateButton;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  changeButton: {
    borderWidth: 1,
    borderColor: '#FF8224',
    width: 80,
    height: 35,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FF8224',
  },
});
