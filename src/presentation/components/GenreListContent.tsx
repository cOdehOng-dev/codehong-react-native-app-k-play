import FastImage from '@d11/react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GenreCodeItem } from '../../domain/type/genreCode';
import { RootStackNavigationProp } from '../screens/stack/RootStack';
import { Utils } from '../utils';

type Props = {
  genreList: GenreCodeItem[];
  onClickGenre: (genreCode: GenreCodeItem) => void;
};

const GenreContent = ({
  genreCode,
  onClick,
}: {
  genreCode: GenreCodeItem;
  onClick: () => void;
}) => {
  const iconResId = genreCode.icon;
  return (
    <Pressable style={styles.contentContainer} onPress={onClick}>
      <FastImage style={styles.icon} source={iconResId} />
      <Text style={styles.text}>{genreCode.displayName}</Text>
    </Pressable>
  );
};

function GenreListContent({ genreList, onClickGenre }: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const rows = Utils.chunk(genreList, 5);

  return (
    <View style={styles.column}>
      {rows.map((row, index) => (
        <View style={styles.row} key={index}>
          {row.map(genreCode => (
            <GenreContent
              genreCode={genreCode}
              onClick={() => {
                navigation.navigate('GenreRankList', {
                  genreCode: genreCode.code,
                });
              }}
              key={genreCode.code}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

export default GenreListContent;

const styles = StyleSheet.create({
  column: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    gap: 4,
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 4,
  },
  icon: {
    width: 50,
    height: 50,
  },
  text: {
    width: '100%',
    fontSize: 12,
    textAlign: 'center',
    color: '#000000',
    paddingTop: 6,
  },
});
