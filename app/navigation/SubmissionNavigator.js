import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SubmissionListScreen from '../screens/SubmissionListScreen';
import SubmissionDetailScreen from '../screens/SubmissionDetailScreen';

const Stack = createStackNavigator();

const SubmissionNavigator = () => (
  <Stack.Navigator>
    <Stack.Group
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="SubmissionList" component={SubmissionListScreen} />
      <Stack.Screen name="SubmissionDetailScreen" component={SubmissionDetailScreen} />
    </Stack.Group>
  </Stack.Navigator>
)

export default SubmissionNavigator;
