import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getPeriod,
  PerformanceInfoItem,
} from '../../domain/model/performanceInfoItem';
import { PerformanceGroup } from '../../domain/model/performanceGroup';
import { extractParenthesesContent } from '../../domain/util/util';
import Badge from './Badge';

type Props = {
  selectedPin: PerformanceGroup | null;
  onSelectPerformance: (id: string) => void;
  onClose: () => void;
};

const Item = ({
  item,
  onSelectPerformance,
}: {
  item: PerformanceInfoItem;
  onSelectPerformance: (id: string) => void;
}) => {
  return (
    <Pressable
      onPress={() => {
        onSelectPerformance(item.id ?? '');
      }}
    >
      <View style={styles.performanceRoot}>
        <FastImage
          source={{
            uri: item.posterUrl ?? '',
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.performanceThumbnail}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.performanceInfoContainer}>
          <Text style={styles.performanceName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.performancePeriod}>{getPeriod(item)}</Text>
          <View style={styles.mt}>
            <Badge text={extractParenthesesContent(item.genre)} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const PerformanceModal = ({
  selectedPin,
  onClose,
  onSelectPerformance,
}: Props) => {
  return (
    <Modal
      visible={selectedPin !== null}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalSheet}>
          <View style={styles.dragHandle} />
          <Text style={styles.title}>{selectedPin?.placeName}</Text>
          <FlatList
            data={selectedPin?.performanceList}
            keyExtractor={(item: PerformanceInfoItem) => item.id ?? ''}
            renderItem={({ item }) => (
              <Item item={item} onSelectPerformance={onSelectPerformance} />
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  performanceName: {
    width: '100%',
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  performancePeriod: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  performanceRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  performanceThumbnail: {
    width: 72,
    height: 96,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  performanceInfoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  mt: {
    marginTop: 4,
  },
});

export default PerformanceModal;
