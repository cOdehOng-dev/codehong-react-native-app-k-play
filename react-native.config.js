module.exports = {
  dependencies: {
    '@mj-studio/react-native-naver-map': {
      platforms: {
        android: {
          packageImportPath:
            'import com.mjstudio.reactnativenavermap.RNCNaverMapPackage;',
          packageInstance: 'new RNCNaverMapPackage()',
        },
      },
    },
  },
};
