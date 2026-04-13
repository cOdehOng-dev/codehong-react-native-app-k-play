import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconHeader from '../components/IconHeader';
import { RootContainer } from '../components/RootContainer';
import { useGenreRankListViewModel } from '../mvi/genre-rank-list/useGenreRankListViewModel';
import {
  RootStackNavigationProp,
  RootStackScreenProps,
} from './stack/RootStack';
import RegionScrollTab from '../components/tab/RegionScrollTab';
import ChangeDateButton from '../components/ChangeDateButton';
import CalendarModal from '../components/calendar/CalendarModal';
import { DateUtil } from '../../domain/util/dateUtil';

type Props = RootStackScreenProps<'GenreRankList'>;

const GenreRankListScreen = ({ route }: Props) => {
  const { state, onAction, setGenreCodeItem, setSelectedRegionCode } =
    useGenreRankListViewModel();

  const { genreCode } = route.params;

  useEffect(() => {
    setGenreCodeItem(genreCode);
  }, [genreCode, setGenreCodeItem]);

  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <RootContainer
      topBar={
        <IconHeader
          title={state.genreCode?.displayName ?? ''}
          onClick={() => navigation.goBack()}
        />
      }
    >
      <View style={styles.root}>
        <CalendarModal
          visible={state.isVisibleCalendar}
          initialStartDate={state.startDate}
          initialEndDate={state.endDate}
          onConfirm={(start, end) => {
            console.log('선택된 날짜:', start, end);
            onAction({
              type: 'SELECTED_START_DATE',
              payload: start ?? DateUtil.getToday('YYYYMMDD'),
            });
            onAction({
              type: 'SELECTED_END_DATE',
              payload: end ?? DateUtil.getOneMonthLater('YYYYMMDD'),
            });
          }}
          onDismiss={() =>
            onAction({ type: 'SET_VISIBLE_CALENDAR', payload: false })
          }
        />
        <RegionScrollTab
          selected={state.selectedRegionCode}
          onSelect={region => setSelectedRegionCode(region.code)}
        />
        <ChangeDateButton
          startDate={state.startDate}
          endDate={state.endDate}
          onClickDateChange={() => {
            onAction({ type: 'SET_VISIBLE_CALENDAR', payload: true });
          }}
        />
      </View>
    </RootContainer>
  );
};

export default GenreRankListScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});
