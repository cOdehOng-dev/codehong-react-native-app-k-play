import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PerformanceInfoItem } from '../../domain/model/performanceInfoItem';
import { DateUtil } from '../../domain/util/dateUtil';
import ChangeDateButton from '../components/ChangeDateButton';
import IconHeader from '../components/IconHeader';
import IndicatorProgress from '../components/IndicatorProgress';
import PerformanceListInfoContent from '../components/PerformanceListInfoContent';
import { RootContainer } from '../components/RootContainer';
import PerformanceListInfoSkeleton from '../components/skeleton/PerformanceListInfoSkeleton';
import CalendarModal from '../components/calendar/CalendarModal';
import { useGenreRankListViewModel } from '../mvi/genre-rank-list/useGenreRankListViewModel';
import RegionScrollTab from '../components/tab/RegionScrollTab';
import {
  RootStackNavigationProp,
  RootStackScreenProps,
} from './stack/RootStack';

type Props = RootStackScreenProps<'GenreRankList'>;

const GenreRankListScreen = ({ route }: Props) => {
  const {
    state,
    isLoadingGenreRankList,
    onAction,
    setGenreCodeItem,
    setSelectedRegionCode,
    loadMore,
  } = useGenreRankListViewModel();

  const { genreCode } = route.params;

  useEffect(() => {
    setGenreCodeItem(genreCode);
  }, [genreCode, setGenreCodeItem]);

  const navigation = useNavigation<RootStackNavigationProp>();

  const renderItem = useCallback(
    ({ item }: { item: PerformanceInfoItem }) => (
      <PerformanceListInfoContent
        item={item}
        onClick={() =>
          navigation.navigate('Detail', { performanceId: item.id ?? '' })
        }
      />
    ),
    [navigation],
  );

  const keyExtractor = useCallback(
    (item: PerformanceInfoItem, index: number) =>
      `${item.id ?? index}-${index}`,
    [],
  );

  return (
    <RootContainer
      topBar={
        <IconHeader
          title={state.genreCode?.displayName ?? ''}
          onClick={() => navigation.goBack()}
        />
      }
    >
      <CalendarModal
        visible={state.isVisibleCalendar}
        initialStartDate={state.startDate}
        initialEndDate={state.endDate}
        onConfirm={(start, end) => {
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
      <View style={styles.root}>
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
        {state.isInitialInit && isLoadingGenreRankList ? (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <PerformanceListInfoSkeleton key={i} />
            ))}
          </>
        ) : (
          <FlatList
            style={styles.root}
            contentContainerStyle={styles.listContent}
            data={state.genreRankList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={state.noMoreData ? undefined : loadMore}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              state.isFetched && !state.isInitialInit && !isLoadingGenreRankList ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>{'공연이 없어요:('}</Text>
                </View>
              ) : null
            }
          />
        )}
      </View>

      {state.isLoadMore && (
        <View style={styles.indicator}>
          <IndicatorProgress />
        </View>
      )}
    </RootContainer>
  );
};

export default GenreRankListScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContent: {
    paddingBottom: 24,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
});
