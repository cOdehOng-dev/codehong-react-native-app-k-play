import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PerformanceDetail } from '../../../domain/model/detail/performanceDetail';
import PerformanceDetailInfoContent from './PerformanceDetailInfoContent';
import { toPeriod } from '../../../domain/util/util';

interface Props {
  detail: PerformanceDetail | null;
}

function InfoContent({ detail }: Props) {
  const period = toPeriod(detail?.startDate, detail?.endDate);
  return (
    <View style={styles.root}>
      {period && (
        <PerformanceDetailInfoContent label="공연 기간" value={period} />
      )}
      {detail?.facilityName && (
        <PerformanceDetailInfoContent
          label="공  연  장"
          value={detail.facilityName}
        />
      )}
      {detail?.runtime && (
        <PerformanceDetailInfoContent
          label="러닝 타임"
          value={detail.runtime}
        />
      )}
      {detail?.ageLimit && (
        <PerformanceDetailInfoContent
          label="관람 등급"
          value={detail?.ageLimit}
        />
      )}
      {detail?.hostCompany && (
        <PerformanceDetailInfoContent
          label="주       최"
          value={detail?.hostCompany}
        />
      )}
      {detail?.sponsorCompany && (
        <PerformanceDetailInfoContent
          label="주       관"
          value={detail?.sponsorCompany}
        />
      )}
    </View>
  );
}

export default InfoContent;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
