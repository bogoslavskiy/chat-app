import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParams } from './types/AuthStackParams';
import { LoginScreen } from '../screens/LoginScreen';

const AuthStack = createStackNavigator<AuthStackParams>();

export const AuthStackScreens: React.FC = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen 
      name="Login" 
      component={LoginScreen} 
    />
  </AuthStack.Navigator>
);