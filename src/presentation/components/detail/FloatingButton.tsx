/* eslint-disable react-native/no-inline-styles */
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  viewStyle: ViewStyle;
  isBookMark: boolean;
  onClick: () => void;
}

function FloatingButton({ viewStyle, isBookMark, onClick }: Props) {
  return (
    <View
      style={[
        styles.root,
        viewStyle,
        { paddingBottom: Platform.OS === 'android' ? 12 : 38 },
      ]}
    >
      <Pressable style={styles.buttonContainer} onPress={onClick}>
        <Text style={styles.buttonText}>예매처로 가기</Text>
      </Pressable>
      <Pressable
        style={styles.iconContainer}
        onPress={() => {
          // TODO
        }}
      >
        <MaterialIcons
          name={isBookMark ? 'bookmark' : 'bookmark-border'}
          color={isBookMark ? '#FF8224' : '#9E9E9E'}
          size={30}
        />
      </Pressable>
    </View>
  );
}

export default FloatingButton;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#FF8224FF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 10,
    marginEnd: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
