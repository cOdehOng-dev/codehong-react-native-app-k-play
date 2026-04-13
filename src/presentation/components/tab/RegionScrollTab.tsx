import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RegionCode, regionCodeList } from '../../../domain/type/regionCode';
import ScrollTab from '../ScrollTab';

type Props = {
  selected: RegionCode;
  onSelect: (region: RegionCode) => void;
};

const RegionScrollTab = ({ selected, onSelect }: Props) => {
  const selectedIndex = Math.max(regionCodeList.indexOf(selected), 0);
  return (
    <ScrollTab
      initialSelectIndex={selectedIndex}
      tabList={regionCodeList}
      tabTextList={regionCodeList.map(tab => tab.displayName)}
      onClickTab={(index, tabText) => {
        onSelect(regionCodeList[index]);
      }}
    />
  );
};

export default RegionScrollTab;

const styles = StyleSheet.create({});
