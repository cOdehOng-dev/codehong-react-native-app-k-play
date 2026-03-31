import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Props {
  castInfo: string | null;
  crewInfo: string | null;
}

function PerformanceDetailCastContent({ castInfo, crewInfo }: Props) {
  if (!castInfo && !crewInfo) {
    return;
  }

  return (
    <View style={styles.root}>
      <View style={styles.divider} />
      <Text style={styles.title}>{'출연진 및 제작진'}</Text>
      {castInfo && <Text style={styles.castContent}>{castInfo}</Text>}
      {crewInfo && <Text style={styles.crewContent}>{crewInfo}</Text>}
    </View>
  );
}

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
    marginBottom: 26,
  },
  castContent: {
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
  crewContent: {
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    marginBottom: 32,
  },
});

export default PerformanceDetailCastContent;
