import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarUtils } from './calendarUtils';
import { SelectionState } from './selectionState';
import Day from './Day';
import { HOLIDAY_LIST } from '../../../domain/consts';

type Props = {
  week: (Date | null)[];
  todayDate: Date;
  startYYYYmmDD: string | null;
  endYYYYmmDD: string | null;
  onDatePress: (day: Date) => void;
};

function WeekComponent({
  week,
  todayDate,
  startYYYYmmDD,
  endYYYYmmDD,
  onDatePress,
}: Props) {
  const hasRange =
    startYYYYmmDD !== null &&
    endYYYYmmDD !== null &&
    startYYYYmmDD !== endYYYYmmDD;

  return (
    <View style={styles.weekRow}>
      {week.map((day, i) => {
        if (!day) {
          return <View key={i} style={styles.dayWrapper} />;
        }
        const yyyyMMdd = CalendarUtils.dateToYMD(day);
        const isPast = CalendarUtils.isPast(day, todayDate);
        const isStart = startYYYYmmDD === yyyyMMdd;
        const isEnd = endYYYYmmDD === yyyyMMdd;
        const inRange =
          !isPast &&
          !isStart &&
          !isEnd &&
          startYYYYmmDD !== null &&
          endYYYYmmDD !== null &&
          yyyyMMdd > startYYYYmmDD &&
          yyyyMMdd < endYYYYmmDD;
        const isHoliday =
          day.getDay() === 0 || (HOLIDAY_LIST?.includes(yyyyMMdd) ?? false);
        const isToday = CalendarUtils.isSameDay(day, todayDate);

        const state: SelectionState = isPast
          ? 'past'
          : isStart
          ? 'start'
          : isEnd
          ? 'end'
          : inRange
          ? 'inRange'
          : 'default';

        return (
          <View key={i} style={styles.dayWrapper}>
            <Day
              day={day}
              state={state}
              showStartHalf={isStart && hasRange}
              showEndHalf={isEnd && hasRange}
              isToday={isToday}
              isHoliday={isHoliday}
              onPress={onDatePress}
            />
          </View>
        );
      })}
    </View>
  );
}

const Week = memo(WeekComponent);
export default Week;

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dayWrapper: {
    flex: 1,
  },
});
