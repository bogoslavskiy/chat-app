import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type AuthStackParams = {
  Login: undefined;
};

export type AuthNavProps<T extends keyof AuthStackParams> = {
  navigation: StackNavigationProp<AuthStackParams, T>;
  route: RouteProp<AuthStackParams, T>;
};