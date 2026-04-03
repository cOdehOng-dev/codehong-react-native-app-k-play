import { Alert, Linking, Platform, ToastAndroid } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

function showError(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('오류', message);
  }
}

export async function openInAppBrowser(rawUrl: string) {
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
    showError('브라우저를 열 수 없습니다.');
  }
}
