import React from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, getUserFromStorage } from '../contexts/AuthContext';
import { Center } from '../components/Center';
import { WrapperMainStack } from './MainStack';
import { AuthStackScreens } from './AuthStack';

export const Routes: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const { setUser, user } = React.useContext(AuthContext);

  React.useEffect(() => {
    getUserFromStorage()
      .then((user) => {
        if (user) {
          setUser(user);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size='large' />
      </Center>
    );
  }

  return (
    <NavigationContainer 
      theme={{ 
        dark: false, 
        colors: { 
          primary: '#007BFF',
          background: '#FFF',
          card: '#FFF',
          text: '#262626',
          border: 'transparent',
        } 
      }}
    >
      {user ? <WrapperMainStack /> : <AuthStackScreens />}
    </NavigationContainer>
  );
};