import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import colors from '../config/colors';
import settings from '../config/settings';

function Screen({ children, style, hasNoHeader }) {
  const edges = ['left', 'right']
  if (hasNoHeader) {
    edges.push('top')
  }

  return (
    <SafeAreaView style={[styles.screen, style]} edges={edges}>
      <StatusBar barStyle='light-content' />
      <View style={{backgroundColor: settings.statusBarColor, height: 6}} />
      <View style={[styles.view, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  view: {
    flex: 1
  }
})

export default Screen;