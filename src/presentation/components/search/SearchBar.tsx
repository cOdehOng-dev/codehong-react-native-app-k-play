import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { useRef } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../screens/stack/RootStack';
import FastImage from '@d11/react-native-fast-image';

type Props = {
  keyword: string;
  onSearch: (keyword: string) => void;
  onChangeText: (keyword: string) => void;
};

const SearchBar = ({ keyword, onSearch, onChangeText }: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const inputRef = useRef<TextInput>(null);

  const handleClear = () => {
    onChangeText('');
    inputRef.current?.focus();
  };

  return (
    <View style={styles.root}>
      <Pressable
        style={styles.iconContainer}
        onPress={() => navigation.goBack()}
      >
        <FastImage
          style={styles.icon}
          source={require('../../../assets/images/ic_34_arrow_left.png')}
        />
      </Pressable>
      <View style={styles.container}>
        <MaterialIcons name="search" size={22} color="#FF8224" />
        <TextInput
          ref={inputRef}
          style={styles.text}
          placeholder="찾고 싶은 공연, 배우를 검색해보세요"
          numberOfLines={1}
          placeholderTextColor="#54545780"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          autoFocus={false}
          returnKeyType="search"
          value={keyword}
          onChangeText={onChangeText}
          onSubmitEditing={() => onSearch(keyword)}
        />
        {keyword.length > 0 && (
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <FastImage
              style={styles.clearIcon}
              source={require('../../../assets/images/ic_20_close.png')}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: 40,
    backgroundColor: '#5454570D',
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  iconContainer: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    width: 20,
    height: 20,
  },
});

export default SearchBar;
