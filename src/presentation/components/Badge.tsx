import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function Badge({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.badgeText}>{text}</Text>
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

export default Badge;
