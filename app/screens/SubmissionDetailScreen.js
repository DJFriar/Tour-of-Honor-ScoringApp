import React, { useEffect } from 'react';
import { Image, Platform, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as Yup from 'yup';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import ImageLink from '../components/ImageLink';
import MiniHeading from '../components/MiniHeading';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import settings from '../config/settings';
import submissionApi from '../api/scoring';
import SubmitButton from '../components/forms/SubmitButton';
import TappableIcon from '../components/TappableIcon';
import useApi from '../hooks/useApi';
import useAuth from '../auth/useAuth';

function SubmissionDetailScreen({ navigation, route }) {
  const { user, logOut } = useAuth();
  const isFocused = useIsFocused();
  const submissionID = route.params.id;
  const getSubmissionDetailsApi = useApi(submissionApi.getPendingSubmissionDetails);
  const submissionDetails = getSubmissionDetailsApi.data[0] || {};
  const submissionLat = submissionDetails.Latitude;
  const submissionLong = submissionDetails.Longitude;
  const submissionCode = submissionDetails.Code;
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const gpsUrl = Platform.select({
    ios: `${scheme}${submissionCode}@${submissionLat},${submissionLong}`,
    android: `${scheme}${submissionLat},${submissionLong}(${submissionCode})`
  });
  const primaryImageURL = settings.submittedImagesBaseUrl + submissionDetails.PrimaryImage;
  const optionalImageURL = settings.submittedImagesBaseUrl + submissionDetails.OptionalImage;
  const sampleImageURL = "http://images.tourofhonor.com/SampleImages/" + submissionDetails.SampleImage;

  const handleApprove = async (submission) => {

    console.log("==== submission ====");
    console.log(submission);
    const result = await submissionApi.postScoringResponse(
      { 
        Status: 1,
        SubmissionID: submission.id,
        MemorialID: submission.MemorialID,
        UserID: submission.UserID,
        FlagNumber: submission.FlagNumber,
        OtherRiders: submission.OtherRiders
      }
    );

    console.log("==== submit Scoring Response result ====");
    console.log(result);

    if (!result.ok) {
      return alert('Could not save scoring response.')
    } else {
      navigation.navigate(routes.SUBMISSION_LIST)
    }
  }

  const handleReject = async () => {
    // if (ScorerNotes == "undefined" || ScorerNotes == "") {
    //   return alert('ScorerNotes are required to reject a submission.');
    // } else {
    //   const result = await submissionApi.postScoringResponse(
    //     {Status: 2}
    //   );
  
    //   if (!result.ok) {
    //     return alert('Could not save scoring response.')
    //   } else {
    //     navigation.goBack();
    //   }
    // }
    console.log("handleReject was touched.");
  }

  const handleSkip = async () => {
    const result = await submissionApi.postScoringResponse(
      {Status: 3}
    );

    if (!result.ok) {
      return alert('Could not save scoring response.')
    } else {
      // navigation.goBack();
    }
  }

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
            <AppText style={styles.submissionName}>#{submissionDetails.id}: Pending {submissionDetails.CatName} Submission</AppText>
          </View>
          <View style={styles.statusIcons}>
            {submissionDetails.Status === 2 && <FontAwesomeIcon icon={['fas', 'shield-exclamation']} size={25} color={'red'} />}
            {submissionDetails.Status === 1 && <FontAwesomeIcon icon={['fas', 'shield-check']} size={25} color={'green'} />}
            {submissionDetails.Status === 0 && <FontAwesomeIcon icon={['far', 'clock']} size={25} /> }
          </View>
        </View>

        {/* Middle Section */}
        <View style={styles.sampleImageContainer}>
          <View>
            {/* <ImageLink source={sampleImageURL} /> */}
            <Image style={styles.sampleImage} source={{uri: sampleImageURL}} />
            <View style={styles.infoIconsContainer}>
              {submissionDetails.MultiImage > 0 && <FontAwesomeIcon icon={['far', 'images']} size={35} />}
              <TappableIcon iconFamily="fal" iconName="map-signs" onPress={() => {Linking.openURL(gpsUrl)}}/>
              {submissionDetails.Restrictions > 1 && <FontAwesomeIcon icon={['fas', 'octagon-exclamation']} size={35} color={'red'} />}
            </View>
          </View>
          <View style={styles.submissionDetailsContainer}>
            <MiniHeading style={styles.miniHeader}>Memorial Info</MiniHeading>
            <AppText style={styles.submissionDetailsText}>{submissionDetails.Name}</AppText>
            <AppText style={styles.submissionDetailsText}>{submissionDetails.City}, {submissionDetails.State}</AppText>
            <AppText style={styles.submissionDetailsText}>{submissionDetails.Latitude}, {submissionDetails.Longitude}</AppText>
            <AppText style={styles.submissionDetailsText}>Access: {submissionDetails.Access}</AppText>
            <AppText style={styles.submissionDetailsText}>MultiImage: {submissionDetails.MultiImage}</AppText>
            <AppText style={styles.submissionDetailsText}>Restrictions: {submissionDetails.Restrictions}</AppText>
            <MiniHeading style={styles.miniHeader}>Submission Info</MiniHeading>
            <AppText style={styles.submissionDetailsText}>Source: {submissionDetails.Source}</AppText>
            <AppText style={styles.submissionDetailsText}>Date: {submissionDetails.createdAt}</AppText>
            <MiniHeading style={styles.miniHeader}>Rider Info</MiniHeading>
            <AppText style={styles.submissionDetailsText}>{submissionDetails.FlagNumber}</AppText>
            <AppText style={styles.submissionDetailsText}>{submissionDetails.FirstName} {submissionDetails.LastName}</AppText>
            <AppText style={styles.submissionDetailsText}>{submissionDetails.Email}</AppText>
          </View>
        </View>
        <View style={styles.submittedImagesContainer}>
          {(submissionDetails.OptionalImage) ?
          <>
            <Image style={styles.submittedImage} source={{uri: primaryImageURL}} />
            <Image style={[styles.submittedImage, {marginLeft: 8}]} source={{uri: optionalImageURL}} />
          </> : <>
            <Image style={styles.submittedImage} source={{uri: primaryImageURL}} />
          </>}
        </View>

          <View>  
            <AppTextInput 
              autoCorrect
              maxLength={250}
              multiline
              name="ScorerNotes"
              numberOfLines={4}
              placeholder="Scorer Notes"
            />
            <View style={styles.scoringButtonsContainer}>
              <AppButton title="Reject" color="primary" onPress={() => handleReject(submissionDetails)} />
              <AppButton title="Skip" color="blue" onPress={() => handleSkip(submissionDetails)} />
              <AppButton title="Approve" color="green" onPress={() => handleApprove(submissionDetails)} />
            </View>
          </View>

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
  miniHeader: {
    paddingTop: 6,
  },
  submissionCityState: {
    fontSize: 16
  },
  submissionCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  submissionCodeText: {
    fontSize: 16,
  },
  submissionName: {
    fontSize: 20,
    fontWeight: "600"
  },
  submissionNameContainer: {
    flex: 1,
  },
  metadataDetailContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sampleImage: {
    borderRadius: 10,
    height: 315,
    width: 420,
  },
  sampleImageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  scoringButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  statusIcons: {
    alignItems: 'flex-end',
    padding: 2,
    paddingRight: 6,
  },
  submitButtonContainer: {
    marginHorizontal: 25,
  },
  submittedImage: {
    borderRadius: 10,
    height: 270,
    width: 360,
  },
  submittedImagesContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    width: '100%',
  },
  topDetailInfo: {
    flexDirection: 'row',
    paddingLeft: 10
  },
});

export default SubmissionDetailScreen;