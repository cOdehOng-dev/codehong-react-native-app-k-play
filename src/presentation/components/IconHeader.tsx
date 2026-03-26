import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  title: string;
  onClick: () => void;
};

function IconHeader({ title, onClick }: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconContainer} onPress={onClick}>
        <Image
          style={styles.icon}
          source={require('../../assets/images/ic_34_arrow_left.png')}
        />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dummy} />
    </View>
  );
}

export default IconHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    width: 40,
    height: '100%',
    paddingStart: 8,
    justifyContent: 'center',
  },
  icon: {
    width: 34,
    height: 24,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dummy: {
    width: 40,
    height: 40,
  },
});
