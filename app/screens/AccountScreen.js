import React from 'react';
import * as Application from 'expo-application';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import colors from '../config/colors';
import MiniAppButton from '../components/MiniAppButton';
import Screen from '../components/Screen';
import useAuth from '../auth/useAuth';

function AccountScreen(props) {
  const { user, logOut } = useAuth();
  const appVersion = Application.nativeApplicationVersion;
  
  console.log(user);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
        <View style={styles.topContainer}>
          <View style={styles.nameLogOutRow}>
            <View style={styles.nameAndFlagContainer}>
              <Text style={styles.riderName}>{user.FirstName} {user.LastName}</Text>
              <Text style={styles.flag}>Flag #{user.FlagNumber}</Text>
            </View>
            <View style={styles.logoutButtonContainer}>
              <MiniAppButton title="Log Out" onPress={() => logOut()}/>
            </View>
          </View>
          <View style={styles.userDetailContainer}>
            <View style={styles.textRow}>
              <Text style={styles.label}>Email:</Text><Text style={styles.text}>{user.Email}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Zip Code:</Text><Text style={styles.text}>{user.ZipCode}</Text>
            </View>
          </View>
          <View style={styles.changesTextContainer}>
            <Text>To make changes to your User Profile, please login to the Scoring Portal.</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>

        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.appInfoRow}>
            <Text style={styles.copyright}>&copy;2022 ambitiousNerds</Text>
            <Text style={styles.appInfo}>Version {appVersion}</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  appInfo:{
    fontSize: 12,
  },
  appInfoRow:{
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4
  },
  bottomContainer: {
    marginTop: 40,
  },
  copyright: {
    fontSize: 10,
  },
  changesTextContainer: {
    marginVertical: 10
  },
  faqSection: {
    marginTop: 10,
    marginRight: 10,
    paddingRight: 10
  },
  flag :{
    fontSize: 20,
  },
  iconDefinition: {
    fontSize: 14,
    paddingLeft: 8
  },
  iconDefinitionRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginRight: 6,
  },
  label: {
    alignItems: 'flex-start',
    fontSize: 18,
  },
  logoutButtonContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  nameAndFlagContainer: {
    flex: 2,
  },
  nameLogOutRow: {
    flex: 1,
    flexDirection: 'row',
  },
  riderName: {
    fontSize: 24,
    fontWeight: "500",
  },
  screen: {
    backgroundColor: colors.background,
  },
  suggestionsSection:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    alignItems: 'flex-end',
    fontSize: 18,
  },
  textRow: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topContainer: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  userDetailContainer: {
    marginTop: 10,
  },
});

export default AccountScreen;