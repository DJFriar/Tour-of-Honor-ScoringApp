import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { AppForm, AppFormField, ErrorMessage, SubmitButton } from '../components/forms';
import AppText from '../components/AppText';
import authApi from '../api/auth';
import Screen from '../components/Screen';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  flag: Yup.number().required().min(1).max(1600).label("Flag Number"),
  zipcode: Yup.string().required().matches(/^[0-9]+$/, "Must be only digits")
    .min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits').label("Zipcode")
});

function LoginScreen(props) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({flag, zipcode}) => {
    const result = await authApi.login(flag, zipcode);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data);
  }

  return (
    <Screen hasNoHeader>
      <ScrollView style={{marginTop: 20}} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo} 
            source={require("../assets/toh_logo.png")}
          />
        </View>
        <AppText style={styles.text}>Please login below using your flag number and zip code.</AppText>
        <AppText style={styles.text}>You must have already clicked the link in your Welcome Email to be able to use this app.</AppText>
        <AppForm 
          initialValues={{ flag: '', zipcode: ''}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.errorMessage}>
            <ErrorMessage error="Invalid flag and/or zipcode. Please ensure you clicked the link in your Welcome Email before using this app." visible={loginFailed} />
          </View>
          <View style={styles.formContent}>
            <AppFormField 
              autoCorrect={false}
              iconFamily="fas"
              iconName="flag"
              keyboardType="number-pad"
              name="flag"
              placeholder="Flag Number"
              height={60}
            />
            <AppFormField 
              autoCorrect={false}
              iconFamily="fas"
              iconName="location-dot"
              keyboardType="number-pad"
              name="zipcode"
              placeholder="Zip Code"
              height={60}
            />
            <SubmitButton title="Login"/>
          </View>
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1, 
    justifyContent: "flex-end",
    marginTop: 20
  },
  errorMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  formContent: {
    padding: 20,
    width: "100%"
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 20
  }
});

export default LoginScreen;