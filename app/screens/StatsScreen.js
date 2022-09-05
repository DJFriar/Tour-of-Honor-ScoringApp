import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// import apiClient from '../api/client';
import AppText from '../components/AppText';
import colors from '../config/colors';
import MiniHeading from '../components/MiniHeading';
import Screen from '../components/Screen';
// import TinyAppButton from '../components/TinyAppButton';
import useAuth from '../auth/useAuth';

function StatsScreen(props) {
  const { user, logOut } = useAuth();
  const [ submissionList, setSubmissionList ] = useState();

  return (
    <Screen style={styles.container} hasNoHeader>
      <View style={styles.topViewContainer}>
        <MiniHeading>Stats</MiniHeading>
        <View style={styles.statSection}>
          <FontAwesomeIcon icon={['far', 'frown']} size={60} />
          <AppText style={styles.text}>This section is not quite ready yet, but is coming soon.</AppText>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>

    </Screen>
  );
}

const styles = StyleSheet.create({
  bottomViewContainer: {
    backgroundColor: colors.background,
    flex: 4,
    margin: 8,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  headerText: {
    flex: 3
  },
  logoutButtonContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  statSection:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    backgroundColor: colors.background
  },
  submissionHeaderRow: {
    flex: 1,
    flexDirection: 'row',
  },
  submissionList: {
    flex: 8
  },
  SubmissionStatuses: {
    flexDirection: 'row'
  },
  text: {
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  topViewContainer: {
    backgroundColor: colors.background,
    flex: 2,
    margin: 8,
  },
});

export default StatsScreen;