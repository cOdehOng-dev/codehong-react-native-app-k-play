import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BoxOfficeItem } from '../../domain/model/BoxOfficeItem';
import { BannerPager } from './BannerPager';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../screens/stack/RootStack';

const BANNER_HEIGHT = 380;

type Props = {
  isLoading: boolean;
  bannerList: BoxOfficeItem[];
};

function TopBannerContent({ isLoading, bannerList }: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return <View style={styles.skeleton} />;
  }

  if (bannerList.length === 0) return null;

  const progress = (currentIndex + 1) / bannerList.length;

  return (
    <View style={styles.container}>
      <BannerPager<BoxOfficeItem>
        pageInfoList={bannerList}
        autoScrollMillSecond={2000}
        infiniteScroll={[true, false]}
        currentIndex={index => setCurrentIndex(index % bannerList.length)}
        content={item => (
          <BannerItem
            item={item}
            onClick={() => {
              navigation.navigate('Detail', {
                performanceId: item.performanceId ?? '',
              });
            }}
          />
        )}
      />

      {/* 하단 프로그레스 바 */}
      <View style={styles.progressWrapper}>
        {/* 배경 바 */}
        <View style={styles.progressBg} />
        {/* 진행 바 */}
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

// ─── BannerItem ──────────────────────────────────────────────────────────────

type BannerItemProps = {
  item: BoxOfficeItem;
  onClick: () => void;
};

function BannerItem({ item, onClick }: BannerItemProps) {
  return (
    <TouchableOpacity
      style={styles.bannerItem}
      onPress={onClick}
      activeOpacity={1}
    >
      {/* 포스터 이미지 */}
      <FastImage
        style={StyleSheet.absoluteFill}
        source={{ uri: item.posterUrl ?? '' }}
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* 그라데이션 오버레이 (하단 → 상단 방향) */}
      <View style={styles.gradientOverlay} />

      {/* 텍스트 정보 (좌측 하단) */}
      <View style={styles.textContainer}>
        {/* 공연 이름 */}
        <Text style={styles.performanceName} numberOfLines={2}>
          {item.performanceName}
        </Text>
        {/* 공연장 */}
        <Text style={styles.placeName} numberOfLines={1}>
          {item.placeName}
        </Text>
        {/* 기간 */}
        <Text style={styles.period} numberOfLines={1}>
          {item.performancePeriod}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: BANNER_HEIGHT,
    backgroundColor: '#FFFFFF',
  },
  skeleton: {
    width: '100%',
    height: BANNER_HEIGHT,
    backgroundColor: '#E0E0E0',
  },
  bannerItem: {
    width: '100%',
    height: BANNER_HEIGHT,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: BANNER_HEIGHT * 0.35,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  textContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 32,
  },
  performanceName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 30,
  },
  placeName: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.9)',
  },
  period: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
  },
  progressWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
    height: 3,
  },
  progressBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#FFFFFF',
  },
});

export default TopBannerContent;
