import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconHeader from '../components/IconHeader';
import { RootStackScreenProps } from './stack/RootStack';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = RootStackScreenProps<'Detail'>;

function DetailScreen({ navigation, route }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <IconHeader title="공연 상세" onClick={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
