import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import * as Linking from 'expo-linking';

import colors from '../config/colors';
import AppText from './AppText';

function ImageLink({imageUri}) {

  return (
    <TouchableWithoutFeedback onPress={() => Linking.openURL(imageUri)}>
      <View style={styles.container}>
        <Image style={styles.image} source={imageUri} />
      </View>
    </TouchableWithoutFeedback>
  )

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 150,
    justifyContent: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    width: 150
  },
  image: {
    height: '100%',
    width: '100%'
  }
});

export default ImageLink;