import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function AppButton({color, disabled = false, onPress, title}) {
  if(disabled) {
    return (
      <TouchableOpacity style={[styles.button, {backgroundColor: colors[color]}]} onPress={onPress} disabled>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={[styles.button, {backgroundColor: colors[color]}]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

export default AppButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 25,
    justifyContent: "center",
    marginVertical: 10,
    padding: 15,
    width: '33%',
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold"
  }
})