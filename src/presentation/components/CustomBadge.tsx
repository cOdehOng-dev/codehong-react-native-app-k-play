import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  text: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  fontSize?: number;
};
function CustomBadge({
  text,
  paddingHorizontal,
  paddingVertical,
  fontSize,
}: Props) {
  return (
    <View
      style={[
        styles.container,
        paddingHorizontal !== undefined ? { paddingHorizontal } : {},
        paddingVertical !== undefined ? { paddingVertical } : {},
      ]}
    >
      <Text style={[styles.badgeText, fontSize ? { fontSize } : {}]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderColor: '#FF8224',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FF8224B3',
  },
});

export default CustomBadge;
