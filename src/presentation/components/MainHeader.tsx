import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  title: string;
};

const MainHeader = ({ title }: Props) => {
  return <Text style={styles.root}>{title}</Text>;
};

export default MainHeader;

const styles = StyleSheet.create({
  root: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
