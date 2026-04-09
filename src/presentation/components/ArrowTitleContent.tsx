import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ArrowRightIcon from './ArrowRightIcon';

type Props = {
  title: string;
  onClickMore: () => void;
};

function ArrowTitleContent({ title, onClickMore }: Props) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <ArrowRightIcon onClickMore={onClickMore} />
    </View>
  );
}

export default ArrowTitleContent;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 6,
  },
  title: {
    flex: 1,
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
