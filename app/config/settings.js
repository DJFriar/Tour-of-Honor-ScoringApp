import Constants from 'expo-constants';

const settings = {
  dev: {
    apiUrl: 'http://10.0.0.100:3700/api/v1',
    statusBarColor: 'orange',
  },
  test: {
    apiUrl: 'https://toh-portal.ambitiousnerds.com/api/v1',
    statusBarColor: 'blue',
  },  
  prod: {
    apiUrl: 'https://scoring.tourofhonor.com/api/v1',
    statusBarColor: '#c0dffd',
  },
}

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === 'test') return settings.test;
  return settings.prod;
}

export default getCurrentSettings();