import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { PerformanceGroup } from '../../domain/model/performanceGroup';
import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  pin: PerformanceGroup;
  onSelect: (pin: PerformanceGroup) => void;
};

const MapMarker = React.memo(({ pin, onSelect }: Props) => {
  const count = pin.performanceList?.length ?? 0;
  const handleTap = useCallback(() => onSelect(pin), [pin, onSelect]);

  return (
    <NaverMapMarkerOverlay
      latitude={pin.lat!}
      longitude={pin.lng!}
      width={60}
      height={62}
      anchor={{ x: 0.5, y: 1 }}
      onTap={handleTap}
    >
      <View collapsable={false} style={styles.wrapper}>
        <MaterialIcons
          name="place"
          size={52}
          color="#FF8224"
          style={styles.icon}
        />
        {count >= 2 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </View>
    </NaverMapMarkerOverlay>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: 60,
    height: 62,
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    left: 4,
  },
  badge: {
    position: 'absolute',
    top: 7,
    right: 8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF322E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default MapMarker;
