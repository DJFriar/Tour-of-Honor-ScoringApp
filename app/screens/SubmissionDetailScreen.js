import React, { useEffect, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useIsFocused } from '@react-navigation/native';
import { DateTime } from 'luxon';
import * as Linking from 'expo-linking';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import MiniHeading from '../components/MiniHeading';
import routes from '../navigation/routes';
import scoringApi from '../api/scoring';
import ScoringButton from '../components/ScoringButton';
import Screen from '../components/Screen';
import settings from '../config/settings';
import useApi from '../hooks/useApi';
import useAuth from '../auth/useAuth';

let formattedDate = Date.now;

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

function SubmissionDetailScreen({ navigation, route }) {
  const { user, logOut } = useAuth();
  const [scorerNotes, setScorerNotes] = useState('');
  const isFocused = useIsFocused();
  const submissionID = route.params.id;
  const getSubmissionDetailsApi = useApi(scoringApi.getPendingSubmissionDetails);
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
  const rawDate = submissionDetails.createdAt;

  let iconSize = 20;

  if(Platform.OS === 'android') {
    iconSize = 28;
    const dateValue = new Date(rawDate);
    const month = dateValue.getMonth() + 1;
    const day = dateValue.getDate();
    const year = dateValue.getFullYear();
    const hour = dateValue.getHours();
    let adjustedHour = 0;
    if (hour == 0) {
      adjustedHour = 12;
    } else {
      adjustedHour = (hour > 12 ? hour - 12 : hour);
    }
    const minutes = addZero(dateValue.getMinutes());

    formattedDate = month + "/" + day + "/" + year + ", " + adjustedHour + ":" + minutes + (hour > 11 ? " PM" : " AM");
  } else {
    formattedDate = DateTime.fromISO(rawDate).setZone("America/New York").toLocaleString(DateTime.DATETIME_SHORT);
  }

  const handleApprove = async (submission) => {
    const approvedData = {
      FlagNumber: submission.FlagNumber,
      MemorialID: submission.MemorialID,
      OtherRiders: submission.OtherRiders,
      ScorerNotes: scorerNotes,
      Status: 1,
      SubmissionID: submission.id,
      UserID: submission.UserID,
    }

    const result = await scoringApi.postScoringResponse(approvedData);

    if (!result.ok) {
      return alert('Could not save scoring response.')
    } else {
      navigation.navigate(routes.SUBMISSION_LIST)
    }
  }

  const handleReject = async (submission) => {
    if (scorerNotes == '') { return alert('You must provide notes to reject a submission.')}
    
    const rejectData = {
      ScorerNotes: scorerNotes,
      Status: 2,
      SubmissionID: submission.id
    }

    const result = await scoringApi.postScoringResponse(rejectData);

    if (!result.ok) {
      return alert('Could not save scoring response.')
    } else {
      navigation.navigate(routes.SUBMISSION_LIST)
    }
  }

  const handleSkip = async (submission) => {
    const skipData = {
      ScorerNotes: scorerNotes,
      Status: 3,
      SubmissionID: submission.id
    }

    const result = await scoringApi.postScoringResponse(skipData);

    if (!result.ok) {
      return alert('Could not save scoring response.')
    } else {
      navigation.navigate(routes.SUBMISSION_LIST)
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

        {/* Top Info Row */}
        <View style={styles.topInfoRow}>
          <View style={styles.submissionNameContainer}>
            <AppText style={styles.submissionName}>#{submissionDetails.id}: {submissionDetails.Name}</AppText>
          </View>
          <View style={styles.statusIcons}>
            {submissionDetails.Restrictions != 'None' && <FontAwesomeIcon icon={['fas', 'octagon-exclamation']} size={iconSize} color={'red'} />}
          </View>
          <View style={styles.statusIcons}>
            {submissionDetails.MultiImage == 'Yes' && <FontAwesomeIcon icon={['far', 'images']} size={iconSize} />}
          </View>
        </View>

        {/* Top Section */}
        <View style={styles.sampleImageContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(sampleImageURL)}>
            <Image style={styles.sampleImage} source={{uri: sampleImageURL}} />
          </TouchableOpacity>
        </View>

        {/* Middle Section */}
        <View style={styles.submittedImagesContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(primaryImageURL)}>
            <Image style={styles.submittedImage} source={{uri: primaryImageURL}} />
          </TouchableOpacity>
          {(submissionDetails.OptionalImage) && 
          <>
            <TouchableOpacity onPress={() => Linking.openURL(optionalImageURL)} >
              <Image style={styles.submittedImage} source={{uri: optionalImageURL}} />
            </TouchableOpacity>
          </>}
        </View>
        {(submissionDetails.RiderNotes) && 
          <View style={styles.riderNotesContainer}>
            <MiniHeading style={styles.miniHeader}>Rider Notes</MiniHeading>
            <AppText style={styles.riderNotesText}>{submissionDetails.RiderNotes}</AppText>
          </View>}
        <View style={styles.scoringSectionContainer}>  
          <AppTextInput 
            autoCorrect
            defaultValue={submissionDetails.ScorerNotes}
            maxLength={250}
            multiline
            name="ScorerNotes"
            numberOfLines={4}
            onChangeText={newNotes => setScorerNotes(newNotes)}
            placeholder="Scorer Notes"
          />
          <View style={styles.scoringButtonsContainer}>
            <ScoringButton title="Reject" color="primary" onPress={() => handleReject(submissionDetails)} />
            <ScoringButton title="Skip" color="blue" onPress={() => handleSkip(submissionDetails)} />
            <ScoringButton title="Approve" color="green" onPress={() => handleApprove(submissionDetails)} />
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.submissionDetailsContainer}>
          <View style={styles.submissionDetailsDataLeft}>          
            <MiniHeading style={styles.miniHeader}>Submission Info</MiniHeading>
            {submissionDetails.Source == 1 && (<AppText style={styles.submissionDetailsText}>Source: <FontAwesomeIcon style={styles.icon} icon={['fal', 'square-question']}/> Unknown</AppText>)}
            {submissionDetails.Source == 2 && (<AppText style={styles.submissionDetailsText}>Source: <FontAwesomeIcon style={styles.icon} icon={['fab', 'apple']} /> iPhone</AppText>)}
            {submissionDetails.Source == 3 && (<AppText style={styles.submissionDetailsText}>Source: <FontAwesomeIcon style={styles.icon} icon={['fab', 'android']} /> Android</AppText>)}
            {submissionDetails.Source == 4 && (<AppText style={styles.submissionDetailsText}>Source: <FontAwesomeIcon style={styles.icon} icon={['fal', 'browser']} /> Web Portal</AppText>)}
            <AppText style={styles.submissionDetailsText}>Date: {formattedDate}</AppText>
            <MiniHeading style={[styles.miniHeader, {marginTop: 6}]}>Rider Info</MiniHeading>
            <AppText style={styles.submissionDetailsText}>{submissionDetails.FlagNumber}</AppText>
            <AppText style={styles.submissionDetailsText}>{submissionDetails.FirstName} {submissionDetails.LastName}</AppText>
            <AppText style={styles.submissionDetailsText}>{submissionDetails.Email}</AppText>
          </View>
          <View style={styles.submissionDetailsDataRight}>
            <MiniHeading style={styles.miniHeader}>Memorial Info</MiniHeading>
            <AppText style={styles.submissionDetailsText}>{submissionDetails.Code}</AppText>
            <AppText style={styles.submissionDetailsText}>{submissionDetails.City}, {submissionDetails.State}</AppText>
            <AppText style={[styles.submissionDetailsText, {marginBottom: 11}]}>{submissionDetails.Latitude}, {submissionDetails.Longitude}</AppText>
            <AppText style={styles.submissionDetailsText}>Access: {submissionDetails.Access}</AppText>
            <AppText style={styles.submissionDetailsText}>MultiImage: {submissionDetails.MultiImage}</AppText>
            <AppText style={styles.submissionDetailsText}>Restrictions: {submissionDetails.Restrictions}</AppText>
          </View>
        </View>

        {/* Weird fix for scrolling */}
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
  metadataDetailContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  riderNotesContainer: {
    marginTop: 16,
    marginHorizontal: 10
  },
  sampleImage: {
    borderRadius: 10,
    height: 315,
    width: 420,
  },
  sampleImageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  scoringButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  scoringSectionContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
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
  submissionDetailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
  },
  submissionDetailsDataLeft: {
    marginLeft: 10,
    marginRight: 2,
  },
  submissionDetailsDataRight: {
    marginLeft: 2,
    marginRight: 10,
    paddingRight: 10
  },
  submissionName: {
    fontSize: 20,
    fontWeight: "600"
  },
  submissionNameContainer: {
    flex: 1,
  },
  submittedImagesContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    width: '100%',
  },
  topInfoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 10
  },
});

export default SubmissionDetailScreen;