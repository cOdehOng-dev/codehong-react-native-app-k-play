// import { FlatList, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { RootContainer } from '../components/RootContainer';
// import IconHeader from '../components/IconHeader';
// import { useNavigation } from '@react-navigation/native';
// import { RootStackNavigationProp } from './stack/RootStack';
// import RegionScrollTab from '../components/tab/RegionScrollTab';
// import ChangeDateButton from '../components/ChangeDateButton';
// import PerformanceListInfoSkeleton from '../components/skeleton/PerformanceListInfoSkeleton';

// const LocalPerformanceListScreen = () => {
//   const navigation = useNavigation<RootStackNavigationProp>();
//   return (
//     <RootContainer
//       topBar={
//         <IconHeader title="지역별 공연" onClick={() => navigation.goBack()} />
//       }
//     >
//       <View style={styles.root}>
//         <RegionScrollTab
//           selected={state.selectedRegionCode}
//           onSelect={region => setSelectedRegionCode(region.code)}
//         />
//         <ChangeDateButton
//           startDate={state.startDate}
//           endDate={state.endDate}
//           onClickDateChange={() => {
//             onAction({ type: 'SET_VISIBLE_CALENDAR', payload: true });
//           }}
//         />
//         {state.isInitialInit ? (
//           <>
//             {Array.from({ length: 6 }).map((_, i) => (
//               <PerformanceListInfoSkeleton key={i} />
//             ))}
//           </>
//         ) : state.genreRankList.length > 0 ? (
//           <FlatList
//             style={styles.root}
//             contentContainerStyle={styles.listContent}
//             data={state.genreRankList}
//             renderItem={renderItem}
//             keyExtractor={keyExtractor}
//             onEndReached={state.noMoreData ? undefined : loadMore}
//             onEndReachedThreshold={0.1}
//             showsVerticalScrollIndicator={false}
//           />
//         ) : (
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>{'공연이 없어요:('}</Text>
//           </View>
//         )}
//       </View>

//       {state.isLoadMore && (
//         <View style={styles.indicator}>
//           <IndicatorProgress />
//         </View>
//       )}
//     </RootContainer>
//   );
// };

// export default LocalPerformanceListScreen;

// const styles = StyleSheet.create({
//   root: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#FFFFFF',
//   },
// });
