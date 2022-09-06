import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
// import AuthNavigator from './app/navigation/AuthNavigator';
import authStorage from './app/auth/storage';
import navigationTheme from './app/navigation/navigationTheme';

// FontAwesome Setup
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faMapMarkedAlt, faMapSigns } from '@fortawesome/pro-light-svg-icons';
import { faBan, faChartBar, faChevronDown, faClock, faFrown, faImages, faSearch, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { faAnalytics, faCameraRetro, faFlag, faLocationDot, faOctagonExclamation, faShieldCheck, faShieldExclamation, faUser } from '@fortawesome/pro-solid-svg-icons';
library.add(
  faAnalytics, faBan, faCameraRetro, faChartBar, faChevronDown, faChevronRight, faClock, faFlag, faFrown, 
  faImages, faLocationDot, faMapMarkedAlt, faMapSigns, faOctagonExclamation, faSearch, faShieldCheck, 
  faShieldExclamation, faTimes, faUser
)

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  }

  useEffect(() => {
    async function prepare() {
      try {
        
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);



  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{user, setUser}} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <AppNavigator />
          {/* {user ? <AppNavigator /> : <AuthNavigator />} */}
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
