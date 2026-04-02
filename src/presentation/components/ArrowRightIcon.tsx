import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  onClickMore: () => void;
};

function ArrowRightIcon({ onClickMore }: Props) {
  return (
    <Pressable style={styles.root} onPress={onClickMore}>
      <MaterialIcons name="arrow-forward-ios" size={20} color="#000000" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArrowRightIcon;
