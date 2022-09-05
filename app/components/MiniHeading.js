import React from 'react';
import { Text } from 'react-native';

import defaultStyles from '../config/styles';

function MiniHeading({children, style, ...otherProps }) {
  return (
    <Text style={[defaultStyles.miniHeading, style]} {...otherProps }>{children}</Text>
  );
}

export default MiniHeading;