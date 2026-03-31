import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Props {
  priceInfo: string | null;
}

function PerformanceDetailPriceContent({ priceInfo }: Props) {
  if (!priceInfo) return null;

  return (
    <View style={styles.root}>
      <View style={styles.divider} />
      <Text style={styles.title}>가격</Text>
      <View style={styles.priceContainer}>
        {priceInfo === '전석무료' ? (
          <Text style={styles.text}>{priceInfo}</Text>
        ) : (
          priceInfo.split(', ').map((item, index) => {
            const spaceIndex = item.lastIndexOf(' ');
            const name = spaceIndex !== -1 ? item.slice(0, spaceIndex) : item;
            const price = spaceIndex !== -1 ? item.slice(spaceIndex + 1) : '';
            return (
              <View key={index}>
                {index > 0 && <View style={styles.spacer} />}
                <View style={styles.priceItem}>
                  <Text style={styles.text}>{name}</Text>
                  <Text style={[styles.text, { fontWeight: 'bold' }]}>
                    {price}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}

export default PerformanceDetailPriceContent;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: 'white',
  },
  divider: {
    width: '100%',
    height: 8,
    backgroundColor: '#5454571A',
    marginBottom: 16,
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  priceContainer: {
    padding: 20,
    margin: 16,
    backgroundColor: '#5454570D',
    borderRadius: 10,
  },
  spacer: {
    height: 20,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#000000',
  },
});
