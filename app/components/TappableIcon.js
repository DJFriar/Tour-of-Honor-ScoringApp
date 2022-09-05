import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

function TappableIcon({iconFamily, iconName, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon icon={[iconFamily, iconName]} size={35} />
    </TouchableOpacity>
  );
}

export default TappableIcon;
