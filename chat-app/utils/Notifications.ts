import { Platform, AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Types from '../graphql/generated';
import { RegisterDeviceMutation, UnregisterDeviceMutation } from '../graphql/queries/Device';
import { client } from '../graphql/client';

export const RegisterPushNotifications = async (user_id: string) => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  try {
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    const previousToken = await AsyncStorage.getItem('PushToken');

    if (previousToken && previousToken === token) {
      return console.log('Push Token exist');
    }

    if (previousToken && previousToken !== token) {
      await client.mutate<
        Types.UnregisterDeviceMutation, 
        Types.UnregisterDeviceMutationVariables
      >({ 
        fetchPolicy: 'no-cache',
        mutation: UnregisterDeviceMutation, 
        variables: { token: previousToken } 
      });

      console.log('Push Token update');
    }
    
    const input = {
      deviceYear: Constants.deviceYearClass.toString(),
      systemVersion: Platform.Version.toString(),
      devicePlatform: Types.DevicePlatform[Platform.OS.toUpperCase()],
      deviceName: Constants.deviceName,
      user_id,
      token,
    };  

    const { data } = await client.mutate<
      Types.RegisterDeviceMutation, 
      Types.RegisterDeviceMutationVariables
    >({ 
      fetchPolicy: 'no-cache',
      mutation: RegisterDeviceMutation, 
      variables: { input } 
    });

    if (data.device.register) {
      AsyncStorage.setItem('PushToken', token);
    }
  } catch (error) {
    console.log('error register device', error);
  }
}
