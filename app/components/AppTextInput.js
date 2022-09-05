import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import defaultStyles from '../config/styles';

function AppTextInput({ iconName, iconFamily, height, ...otherProps }) {
  return (
    <View style={[styles.container, {height: height}]}>
      <View style={styles.iconContainer}>
        {iconName && <FontAwesomeIcon icon={[iconFamily, iconName]} size={20} color={defaultStyles.colors.medium} />}
      </View>
      <View style={styles.textContainer}>
        <TextInput placeholderTextColor={defaultStyles.colors.medium} style={styles.text} {...otherProps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flex: 4,
    flexDirection: "row",
    marginLeft: 10,
    marginVertical: 10,
    paddingVertical: 10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer:{
    marginHorizontal: 10,
  },
  text: {
    color: defaultStyles.colors.dark,
    fontFamily: Platform.OS === "android" ? "Roboto": "Avenir",
  },
  textContainer: {
    flex: 1,
  }
})

export default AppTextInput;