import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type MainStackParams = {
  Conversation: undefined;
};

export type MainNavProps<T extends keyof MainStackParams> = {
  navigation: StackNavigationProp<MainStackParams, T>;
  route: RouteProp<MainStackParams, T>;
};