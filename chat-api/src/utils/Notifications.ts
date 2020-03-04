import Expo, { ExpoPushMessage } from 'expo-server-sdk';
import DeviceTokenModel from '../models/DeviceTokenModel';

const expo = new Expo();

interface SendPushNotificationArgs {
  user_id?: string; 
  title: string;
  body: string; 
  payload?: { [key: string]: any };
}

export const sendPushNotification = async ({ user_id, title, body, payload = {} }: SendPushNotificationArgs) => {
  const tokens = await DeviceTokenModel.find(user_id ? { user_id } : undefined);
  if (tokens.length < 1) {
    return;
  }

  const messages: ExpoPushMessage[] = [];
  for (let pushToken of tokens) {
    if (!Expo.isExpoPushToken(pushToken.token)) {
      console.error(
        `Push token ${pushToken.token} is not a valid Expo push token`
      );
      continue;
    }

    messages.push({
      ttl: 5,
      to: pushToken.token,
      sound: 'default',
      body,
      title,
      data: payload
    });
  }

  const chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    try {
      await expo.sendPushNotificationsAsync(chunk);
    } catch (error) {
      console.error(error);
    }
  }
};