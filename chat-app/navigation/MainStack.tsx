import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParams } from './types/MainStackParams';
import { ConversationScreen } from '../screens/ConversationScreen';
import { RegisterPushNotifications } from '../utils/Notifications';
import { useUser } from '../contexts/AuthContext';

const MainStack = createStackNavigator<MainStackParams>();

export const MainStackScreens: React.FC = () => (
  <MainStack.Navigator 
    initialRouteName="Conversation"
    screenOptions={{
      headerRightContainerStyle: {
        right: 6,
      },
      headerLeftContainerStyle: {
        left: 6,
      },
    }}
  >
    <MainStack.Screen 
      name="Conversation" 
      component={ConversationScreen} 
    />
  </MainStack.Navigator>
);

export const WrapperMainStack: React.FC = () => {
  const user = useUser();

  React.useEffect(() => {
    RegisterPushNotifications(user._id);
  }, [])

  return <MainStackScreens />;
};