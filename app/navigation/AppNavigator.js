import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import AccountScreen from '../screens/AccountScreen';
import routes from './routes';
import StatsScreen from '../screens/StatsScreen';
import SubmissionsButton from "../navigation/SubmissionsButton";
import SubmissionNavigator from './SubmissionNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName='SubmissionNavigator'
  >
    <Tab.Screen name="User Settings" component={AccountScreen} options={{
      tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={['fas', 'user']} color={color} size={size * 1.3} />
    }} />
    <Tab.Screen
      name='SubmissionNavigator'
      component={SubmissionNavigator}
      options={({ navigation }) => ({
          headerShown: false,
          tabBarButton: () => <SubmissionsButton onPress={() => navigation.navigate(routes.MEMORIAL_LIST)}/>,
        })}
    />
    <Tab.Screen name="Stats" component={StatsScreen} options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={['fas', 'analytics']} color={color} size={size * 1.3} />
    }}/>
  </Tab.Navigator>
)

export default AppNavigator;
