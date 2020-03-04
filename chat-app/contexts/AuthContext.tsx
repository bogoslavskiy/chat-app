import React from 'react';
import { AsyncStorage } from 'react-native';
import UUID from 'uuid-random';
import { useApolloClient } from '@apollo/client';
import { useUnregisterDeviceMutation } from '../graphql/generated';

type User = {
  _id: string;
  name: string;
}

type AuthContextState = {
  login: (name: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  user: User;
};

export const AuthContext = React.createContext<AuthContextState>(null);
export const useUser = (): User => {
  const { user } = React.useContext(AuthContext);
  return user;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [userState, setUserState] = React.useState<User>();
  const [unregisterDeviceMutate] = useUnregisterDeviceMutation();
  const client = useApolloClient();

  const setUser = React.useCallback((user: User) => {
    setUserState(user);
  }, []);

  const login = React.useCallback(async (name: string) => {
    const user = { _id: UUID(), name };
    await setUserToStorage(user);
    setUserState(user);
  }, []);

  const logout = React.useCallback(async () => {
    try {
      const pushToken = await AsyncStorage.getItem('PushToken');
      if (pushToken) {
        await unregisterDeviceMutate({ 
          fetchPolicy: 'no-cache',
          variables: { token: pushToken }  
        });

        await AsyncStorage.removeItem('PushToken');
      }

      await client.resetStore();
      await clearUserFromStorage();
      setUserState(null);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: userState, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

let user: User | null = null;

export const getUserFromStorage = async () => {
  if (user) {
    return user;
  }

  try {
    const savedUser = await AsyncStorage.getItem('User');
    if (savedUser) {
      user = JSON.parse(savedUser);
      return user!;
    }

    return null;
  } catch (err) {
    return null;
  }
};

export const setUserToStorage = async (userObj: User) => {
  try {
    await AsyncStorage.setItem('User', JSON.stringify(userObj));
    user = userObj;

    return true;
  } catch(err) { 
    return false;
  } 
};

export const clearUserFromStorage = async () => {
  await AsyncStorage.removeItem('User');
  user = null;
};
