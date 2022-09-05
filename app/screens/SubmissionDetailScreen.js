import React, { useEffect } from 'react';
import { Image, Platform, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';
import submission from '../api/scoring';
import Screen from '../components/Screen';
import TappableIcon from '../components/TappableIcon';
import useApi from '../hooks/useApi';
import useAuth from '../auth/useAuth';

function SubmissionDetailScreen({ route }) {
  const { user, logOut } = useAuth();
  const isFocused = useIsFocused();
  const submissionID = route.params.id;
  let submissionStatus = 9;
  const getSubmissionDetailsApi = useApi(submission.getPendingSubmissionDetails);
  const submissionDetails = getSubmissionDetailsApi.data[0] || {};
  const getSubmissionStatusApi = useApi(submission.getSubmissionStatus);
  const submissionStatusApiResponse = getSubmissionStatusApi.data[0] || {};
  if (submissionStatusApiResponse.Status < 9) { submissionStatus = submissionStatusApiResponse.Status};

  const submissionLat = submissionDetails.Latitude;
  const submissionLong = submissionDetails.Longitude;
  const submissionCode = submissionDetails.Code;
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const gpsUrl = Platform.select({
    ios: `${scheme}${submissionCode}@${submissionLat},${submissionLong}`,
    android: `${scheme}${submissionLat},${submissionLong}(${submissionCode})`
  });
  const contentWidth = useWindowDimensions().width;
  const imageURL = "http://images.tourofhonor.com/SampleImages/" + submissionDetails.SampleImage;

  useEffect(() => {
    getSubmissionDetailsApi.request(submissionID);
  }, [isFocused]);

  return (
    <Screen hasNoHeader>
      {getSubmissionDetailsApi.error && (
        <>
          <AppText>Couldn't retrieve submission details.</AppText>
          <AppButton title="Retry" onPress={getSubmissionDetailsApi.request}/>
        </>
      )}
      <ScrollView style={styles.container}>

        {/* Top Section */}
        <View style={styles.topDetailInfo}>
          <View style={styles.submissionNameContainer}>
            <AppText style={styles.submissionName}>{submissionDetails.Name}</AppText>
            <AppText style={styles.submissionCityState}>{submissionDetails.City}, {submissionDetails.State}</AppText>
          </View>
          <View style={styles.statusIcons}>
            {submissionStatus === 2 && <FontAwesomeIcon icon={['fas', 'shield-exclamation']} size={25} color={'red'} />}
            {submissionStatus === 1 && <FontAwesomeIcon icon={['fas', 'shield-check']} size={25} color={'green'} />}
            {submissionStatus === 0 && <FontAwesomeIcon icon={['far', 'clock']} size={25} /> }
          </View>
        </View>

        {/* Middle Section */}
        <View style={styles.submissionCodeContainer}>
          <AppText style={styles.submissionCodeText}>{submissionDetails.CategoryName}</AppText>
          <AppText style={styles.submissionCodeText}>{submissionDetails.Code}</AppText>
        </View>
        <View style={styles.sampleImageContainer}>
          <Image style={styles.sampleImage} source={{uri: imageURL}} />
        </View>
        <View style={styles.infoIconsContainer}>
          {submissionDetails.MultiImage > 0 && <FontAwesomeIcon icon={['far', 'images']} size={35} />}
          <TappableIcon iconFamily="fal" iconName="map-signs" onPress={() => {Linking.openURL(gpsUrl)}}/>
          {submissionDetails.Restrictions > 1 && <FontAwesomeIcon icon={['fas', 'octagon-exclamation']} size={35} color={'red'} />}
          
        </View>
        {/* <View style={styles.submitButtonContainer}>
          { submissionStatus === 9 &&
            <AppButton title="Submit" onPress={() => 
              navigation.navigate('MemorialSubmitScreen', { 
                id: memorialID,
                name: memorialDetails.Name,
                code: memorialDetails.Code,
                multiImage: memorialDetails.MultiImage,
                sampleImage: memorialDetails.SampleImage
              })} 
            />
          }
          { memorialStatus === 2 &&
            <AppButton title="Resubmit" onPress={() => 
              navigation.navigate('MemorialSubmitScreen', { 
                id: memorialID,
                name: memorialDetails.Name,
                code: memorialDetails.Code,
                multiImage: memorialDetails.MultiImage,
                sampleImage: memorialDetails.SampleImage
              })} 
            />
          }
          { memorialStatus === 1 &&
            <View style={styles.disabledButtonContainer}>
              <AppText style={styles.disabledButtonText}>You have already earned this memorial, congrats!</AppText>
            </View>
          }
          { memorialStatus === 0 &&
            <View style={styles.disabledButtonContainer}>
              <AppText style={styles.disabledButtonText}>This memorial has been submitted and is awaiting review.</AppText>
            </View>
          }
        </View> */}
        
        <View style={{paddingVertical: 10}}>
          <AppText>&nbsp;</AppText>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingVertical: 8,
  },
  disabledButtonText: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  disabledButtonContainer: {
    backgroundColor: '#6e696980',
    borderRadius: 25,
    marginTop: 10,
  },
  infoIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 6,
  },
  memorialCityState: {
    fontSize: 16
  },
  memorialCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  memorialCodeText: {
    fontSize: 16,
  },
  memorialName: {
    fontSize: 20,
    fontWeight: "600"
  },
  memorialNameContainer: {
    flex: 1,
  },
  metadataDetailContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sampleImage: {
    borderRadius: 10,
    height: 270,
    width: 360,
  },
  sampleImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    paddingTop: 10,
  },
  statusIcons: {
    alignItems: 'flex-end',
    padding: 2,
    paddingRight: 6,
  },
  submitButtonContainer: {
    marginHorizontal: 25,
  },
  topDetailInfo: {
    flexDirection: 'row',
    paddingLeft: 10
  },
});

export default SubmissionDetailScreen;