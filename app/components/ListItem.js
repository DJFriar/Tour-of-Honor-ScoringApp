import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';
import settings from '../config/settings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

function ListItem({cityState, category, code, image, submitterName, submitterFlag, onPress}) {
  const imageBaseUrl = settings.submittedImagesBaseUrl;
  const imageURL = imageBaseUrl + image;
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imageURL}} />
        <View style={styles.detailContainer}>
          <View style={styles.submitterNameContainer}>
            <AppText style={styles.name} numberOfLines={1}>{submitterName}</AppText>
            <AppText style={styles.name} numberOfLines={1}>{submitterFlag}</AppText>
          </View>
          <View style={styles.row2}>
            <View style={styles.cityStateContainer}>
              <AppText style={styles.cityState} numberOfLines={1}>{cityState}</AppText>
            </View>
            <View style={styles.sourceIconContainer}>
              {/* <FontAwesomeIcon icon={['fas', 'shield-exclamation']} size={20} color={'red'} /> */}
              {/* <FontAwesomeIcon icon={['fas', 'shield-check']} size={20} color={'green'} /> */}
              {/* <FontAwesomeIcon icon={['far', 'clock']} size={20} /> */}
            </View>
          </View>
          <View style={styles.memorialCode}>
            <AppText style={styles.memorialCodeText}>{category}</AppText>
            <AppText style={styles.memorialCodeText}>{code}</AppText>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  cityState: {
    fontWeight: "400"
  },
  cityStateContainer: {
    alignItems: 'flex-start',
    flex: 9,
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white
  },
  detailContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  memorialCode: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  memorialCodeText: {
    fontSize: 16,
    fontWeight: "400",
  },
  submitterNameContainer: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 20,
    fontWeight: "700"
  },
  sourceIconContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  row2: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default ListItem;