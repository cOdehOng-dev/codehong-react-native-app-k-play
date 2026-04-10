import { StyleSheet, Text, View } from 'react-native';
import React, { memo, useMemo } from 'react';
import Week from './Week';
import { Utils } from '../../utils';
import { CalendarUtils } from './calendarUtils';

type Props = {
  month: Date;
  todayDate: Date;
  isFirstMonth: boolean;
  startYYYYmmDD: string | null;
  endYYYYmmDD: string | null;
  onDatePress: (day: Date) => void;
};

function MonthBlockComponent({
  month,
  todayDate,
  isFirstMonth,
  startYYYYmmDD,
  endYYYYmmDD,
  onDatePress,
}: Props) {
  const weeks = useMemo(
    () => Utils.chunkArray(CalendarUtils.generateMonthDays(month), 7),
    [month],
  );
  const header = CalendarUtils.formatYearMonth(month, 'yyyy.MM');
  const containerStyle = useMemo(
    () => ({
      marginTop: isFirstMonth ? 20 : 0,
      marginBottom: 40,
      paddingHorizontal: 16,
    }),
    [isFirstMonth],
  );

  return (
    <View style={[styles.monthBlock, containerStyle]}>
      <Text style={styles.yearMonthText}>{header}</Text>
      {weeks.map((week, wi) => (
        <Week
          key={wi}
          week={week}
          todayDate={todayDate}
          startYYYYmmDD={startYYYYmmDD}
          endYYYYmmDD={endYYYYmmDD}
          onDatePress={onDatePress}
        />
      ))}
    </View>
  );
}

const MonthBlock = memo(MonthBlockComponent);
export default MonthBlock;

const styles = StyleSheet.create({
  monthBlock: {},
  yearMonthText: {
    marginBottom: 8,
    paddingHorizontal: 11,
    fontSize: 19,
    color: '#000000',
    fontWeight: '700',
    backgroundColor: 'transparent',
  },
});
