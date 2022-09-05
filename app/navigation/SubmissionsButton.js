import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '../config/colors';

function SubmissionsButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.icon} source={require('../assets/toh_logo.png')} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: colors.white,
    borderRadius: 40,
    borderWidth: 10,
    bottom: Platform.OS === "android" ? 30 : 20,
    height: 80,
    justifyContent: 'center',
    // opacity: .6, -- Would be nice to set this on active/inactive state, but not urgent.
    width: 80,
  },
  icon: {
    height: 70,
    width: 70
  }
});

export default SubmissionsButton;