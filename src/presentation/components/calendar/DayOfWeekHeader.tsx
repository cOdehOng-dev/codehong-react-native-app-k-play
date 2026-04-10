import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const dayOfWeekList = ['일', '월', '화', '수', '목', '금', '토'];

const DayOfWeekHeader = () => {
  return (
    <>
      <View style={styles.dowRow}>
        {dayOfWeekList.map((day, i) => (
          <View key={i} style={styles.dowCell}>
            <Text style={styles.dayOfWeekText}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={styles.dowDivider} />
    </>
  );
};

export default DayOfWeekHeader;

const styles = StyleSheet.create({
  dowRow: {
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  dowCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayOfWeekText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666666',
    fontWeight: '400',
    backgroundColor: 'transparent',
  },
  dowDivider: {
    height: 1,
    backgroundColor: '#eeeeee',
    marginHorizontal: 20,
  },
});
