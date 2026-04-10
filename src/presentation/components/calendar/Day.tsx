import React, { memo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { SelectionState } from './selectionState';

const DAY_CELL_HEIGHT = 48;
const CIRCLE_SIZE = 44;

const getDayTextStyle = (
  state: SelectionState,
  isHoliday: boolean,
): TextStyle => {
  switch (state) {
    case 'past':
      return isHoliday ? styles.holidayText : styles.pastdayText;
    case 'start':
    case 'end':
      return styles.startEndDayText;
    case 'inRange':
      return styles.rangeDayText;
    case 'default':
      return isHoliday ? styles.holidayText : styles.defaultDayText;
  }
};

type Props = {
  day: Date;
  state: SelectionState;
  showStartHalf: boolean;
  showEndHalf: boolean;
  isToday: boolean;
  isHoliday: boolean;
  onPress: (day: Date) => void;
};

function DayComponent({
  day,
  state,
  showStartHalf,
  showEndHalf,
  isToday,
  isHoliday,
  onPress,
}: Props) {
  const handlePress = useCallback(() => onPress(day), [onPress, day]);
  const isPast = state === 'past';

  const dayStyle = getDayTextStyle(state, isHoliday);
  const todayTextStyle =
    state === 'start' || state === 'end'
      ? styles.todaySelectedText
      : styles.todayUnselectedText;

  return (
    <TouchableOpacity
      style={styles.dayCell}
      onPress={isPast ? undefined : handlePress}
      disabled={isPast}
      activeOpacity={isPast ? 1 : 0.7}
    >
      {showStartHalf && <View style={styles.halfRightBg} />}
      {showEndHalf && <View style={styles.halfLeftBg} />}
      {state === 'inRange' && <View style={styles.fullBg} />}

      {(state === 'start' || state === 'end') && (
        <View style={styles.circleBg} />
      )}

      <View style={styles.dayTextContent}>
        <Text
          style={[
            styles.dayText,
            {
              fontSize: dayStyle.fontSize,
              fontWeight: dayStyle.fontWeight,
              color: dayStyle.color,
              lineHeight: dayStyle.fontSize ?? 0 * 1.3,
            },
          ]}
        >
          {day.getDate()}
        </Text>
        {isToday && (
          <Text
            style={[
              styles.todayText,
              {
                fontSize: todayTextStyle.fontSize,
                color: todayTextStyle.color,
                lineHeight: todayTextStyle.fontSize ?? 0 * 1.4,
              },
            ]}
          >
            Today
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const Day = memo(DayComponent);

export default Day;

const styles = StyleSheet.create({
  dayCell: {
    height: DAY_CELL_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellWrapper: {
    flex: 1,
  },
  halfLeftBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: '#FF822426',
  },
  halfRightBg: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: '#FF822426',
  },
  fullBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FF822426',
  },
  circleBg: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#FF8224FF',
  },
  dayTextContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  dayText: {
    textAlign: 'center',
  },
  todayText: {
    textAlign: 'center',
    fontWeight: '700',
  },
  holidayText: {
    fontSize: 17,
    color: '#FF322EFF',
    fontWeight: '700',
    backgroundColor: '#00000000',
  },
  pastdayText: {
    fontSize: 17,
    color: '#ccccccff',
    fontWeight: '700',
    backgroundColor: '#00000000',
  },
  startEndDayText: {
    fontSize: 17,
    color: '#ffffff',
    fontWeight: '700',
    backgroundColor: '#FF8224FF',
  },
  rangeDayText: {
    fontSize: 17,
    color: '#FF8224FF',
    fontWeight: '700',
    backgroundColor: '#FF822426',
  },
  defaultDayText: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '700',
    backgroundColor: '#00000000',
  },
  todaySelectedText: {
    fontSize: 8,
    color: '#ffffff',
    fontWeight: '700',
    backgroundColor: '#00000000',
  },
  todayUnselectedText: {
    fontSize: 8,
    color: '#545457',
    fontWeight: '700',
    backgroundColor: '#00000000',
  },
});
