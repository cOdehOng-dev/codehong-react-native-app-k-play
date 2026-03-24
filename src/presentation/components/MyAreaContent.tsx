import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  currentMonth: number;
};

function MyAreaContent({ currentMonth }: Props) {
  return (
    <View>
      <Text style={styles.title}>3월 내 주변 공연이에요</Text>
    </View>
  );
}

export default MyAreaContent;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});
