import * as React from 'react';
import { AppLoading } from 'expo';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import { Routes } from './navigation/Routes';
import { AuthProvider, getUserFromStorage } from './contexts/AuthContext';

const App = ({ skipLoadingScreen }: { skipLoadingScreen: boolean }) => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={(error: any) => {
          console.warn(error);
        }}
        onFinish={() => setLoadingComplete(true)}
      />
    );
  }
  
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ApolloProvider>
  );
};

const loadResourcesAsync = async () => {
  await Promise.all([
    getUserFromStorage(),
  ]);
};

export default App;