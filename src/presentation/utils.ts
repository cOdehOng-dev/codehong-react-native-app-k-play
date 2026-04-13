import { Alert, Linking, Platform, ToastAndroid } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

export const Utils = {
  chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  },

  getToday(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  },

  showError(message: string) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('오류', message);
    }
  },

  async openInAppBrowser(rawUrl: string) {
    if (!rawUrl) return;
    const url =
      rawUrl.startsWith('http://') || rawUrl.startsWith('https://')
        ? rawUrl
        : `https://${rawUrl}`;
    try {
      if (await InAppBrowser.isAvailable()) {
        if (Platform.OS === 'ios') {
          await InAppBrowser.open(url, {
            dismissButtonStyle: 'close',
            preferredBarTintColor: '#FFFFFF',
            preferredControlTintColor: '#FF8224',
            readerMode: false,
            animated: true,
            modalEnabled: true,
          });
        } else {
          await InAppBrowser.open(url, {
            showTitle: true,
            toolbarColor: '#FFFFFF',
            secondaryToolbarColor: '#FF8224',
            enableUrlBarHiding: true,
            enableDefaultShare: true,
            forceCloseOnRedirection: false,
          });
        }
      } else {
        await Linking.openURL(url);
      }
    } catch (e) {
      this.showError('브라우저를 열 수 없습니다.');
    }
  },

  formatToMMdd: (date: string | null | undefined): string => {
    if (!date) return '';
    if (date.length !== 8) return date;
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return `${month}.${day}`;
  },

  formatDateRangeDisplay: (
    startDate: string | null | undefined,
    endDate: string | null | undefined,
  ): string => {
    return `${Utils.formatToMMdd(startDate)} ~ ${Utils.formatToMMdd(endDate)}`;
  },

  chunk: <T>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size),
    ),
};
