import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Utils } from '../../utils';
import { CalendarUtils } from './calendarUtils';
import MonthBlock from './MonthBlock';
import DayOfWeekHeader from './DayOfWeekHeader';

type Props = {
  maxYears?: number;
  initialStartDate?: string;
  initialEndDate?: string;
  onSelected?: ((startDate: Date | null, endDate: Date | null) => void) | null;
};

const Calendar = ({
  maxYears = 1,
  initialStartDate,
  initialEndDate,
  onSelected,
}: Props) => {
  const todayDate = useMemo(() => Utils.getToday(), []);

  const months = useMemo(() => {
    const result: Date[] = [];
    for (let i = 0; i <= maxYears * 12; i++) {
      result.push(
        new Date(todayDate.getFullYear(), todayDate.getMonth() + i, 1),
      );
    }
    return result;
  }, [todayDate, maxYears]);

  const [startDate, setStartDate] = useState<Date | null>(
    initialStartDate ? CalendarUtils.parseCalendarDate(initialStartDate) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialEndDate ? CalendarUtils.parseCalendarDate(initialEndDate) : null,
  );

  const startDateRef = useRef(startDate);
  const endDateRef = useRef(endDate);
  const onSelectedRef = useRef(onSelected);

  startDateRef.current = startDate;
  endDateRef.current = endDate;
  onSelectedRef.current = onSelected;

  const handleDatePress = useCallback((day: Date) => {
    const curStart = startDateRef.current;
    const curEnd = endDateRef.current;
    let newStart: Date | null;
    let newEnd: Date | null;

    if (
      curStart === null ||
      curEnd !== null ||
      CalendarUtils.isDateBefore(day, curStart)
    ) {
      newStart = day;
      newEnd = null;
    } else {
      newStart = curStart;
      newEnd = day;
    }

    setStartDate(newStart);
    setEndDate(newEnd);
    onSelectedRef.current?.(newStart, newEnd);
  }, []);

  const startYYYYmmDD = useMemo(
    () => (startDate ? CalendarUtils.dateToYYYYMMDD(startDate) : null),
    [startDate],
  );
  const endYYYYmmDD = useMemo(
    () => (endDate ? CalendarUtils.dateToYYYYMMDD(endDate) : null),
    [endDate],
  );

  const renderMonth = useCallback(
    ({ item, index }: { item: Date; index: number }) => (
      <MonthBlock
        month={item}
        todayDate={todayDate}
        isFirstMonth={index === 0}
        startYYYYmmDD={startYYYYmmDD}
        endYYYYmmDD={endYYYYmmDD}
        onDatePress={handleDatePress}
      />
    ),
    [todayDate, startYYYYmmDD, endYYYYmmDD, handleDatePress],
  );

  const keyExtractor = useCallback(
    (item: Date) => `${item.getFullYear()}-${item.getMonth()}`,
    [],
  );

  return (
    <View style={styles.root}>
      <DayOfWeekHeader />
      <FlatList
        data={months}
        keyExtractor={keyExtractor}
        renderItem={renderMonth}
        showsVerticalScrollIndicator={false}
        windowSize={3}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        removeClippedSubviews
      />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  monthBlock: {},
  yearMonthText: {
    marginBottom: 8,
    paddingHorizontal: 11,
  },
});
