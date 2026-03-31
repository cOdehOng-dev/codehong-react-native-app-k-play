import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { splitAndParseWithParentheses } from '../../../domain/util/util';

interface Props {
  timeTable: string | null;
}

function PerformanceDetailTimeTableContent({ timeTable }: Props) {
  if (!timeTable) return null;

  const timeTableList = splitAndParseWithParentheses(timeTable);

  return (
    <View style={styles.root}>
      <View style={styles.divider} />
      <Text style={styles.title}>시간표</Text>
      <View style={styles.timeTableContainer}>
        {timeTableList.map((item, index) => (
          <View key={index}>
            {index > 0 && <View style={styles.spacer} />}
            <View style={styles.timeTableItem}>
              <Text style={styles.text}>{item[0]}</Text>
              <Text style={[styles.text, { fontWeight: 'bold' }]}>
                {item[1]}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default PerformanceDetailTimeTableContent;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: 'white',
  },
  divider: {
    width: '100%',
    height: 8,
    backgroundColor: '#5454571A',
    marginBottom: 16,
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  timeTableContainer: {
    padding: 20,
    margin: 16,
    backgroundColor: '#5454570D',
    borderRadius: 10,
  },
  spacer: {
    height: 20,
  },
  timeTableItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#000000',
  },
});
