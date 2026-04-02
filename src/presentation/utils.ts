import { Alert, Platform } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

export async function openInAppBrowser(url: string) {
  if (!url) return;
  try {
    if (await InAppBrowser.isAvailable()) {
      if (Platform.OS === 'ios') {
        await InAppBrowser.open(url, {
          // iOS SFSafariViewController
          dismissButtonStyle: 'close',
          preferredBarTintColor: '#FFFFFF',
          preferredControlTintColor: '#FF8224',
          readerMode: false,
          animated: true,
          modalEnabled: true,
        });
      } else {
        await InAppBrowser.open(url, {
          // Android Custom Tabs
          showTitle: true,
          toolbarColor: '#FFFFFF',
          secondaryToolbarColor: '#FF8224',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
        });
      }
    } else {
      // 인앱 브라우저를 지원하지 않는 기기는 외부 브라우저로 폴백
      await InAppBrowser.openAuth(url, '');
    }
  } catch (e) {
    Alert.alert('오류', '브라우저를 열 수 없습니다.');
  }
}
