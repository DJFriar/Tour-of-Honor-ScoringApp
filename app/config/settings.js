import Constants from 'expo-constants';

const settings = {
  dev: {
    apiUrl: 'http://10.10.10.238:3700/api/v1',
    statusBarColor: 'orange',
    submittedImagesBaseUrl: 'https://images.tourofhonor.com/TestData/'
  },
  test: {
    apiUrl: 'https://scoringtest.tourofhonor.com/api/v1',
    statusBarColor: 'blue',
    submittedImagesBaseUrl: 'https://images.tourofhonor.com/TestData/'
  },
  prod: {
    apiUrl: 'https://scoring.tourofhonor.com/api/v1',
    statusBarColor: '#c0dffd',
    submittedImagesBaseUrl: 'https://images.tourofhonor.com/RallyImages/2025/'
  },
}

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === 'test') return settings.test;
  return settings.prod;
}

export default getCurrentSettings();
