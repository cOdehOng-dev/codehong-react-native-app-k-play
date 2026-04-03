import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GenreCodeItem } from '../../domain/type/genreCode';
import { chunk } from '../../domain/util/util';

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
      <Image style={styles.icon} source={iconResId} />
      <Text style={styles.text}>{genreCode.displayName}</Text>
    </Pressable>
  );
};

function GenreListContent({ genreList, onClickGenre }: Props) {
  const rows = chunk(genreList, 5);

  return (
    <View style={styles.column}>
      {rows.map((row, index) => (
        <View style={styles.row} key={index}>
          {row.map(genreCode => (
            <GenreContent
              genreCode={genreCode}
              onClick={() => onClickGenre(genreCode)}
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
