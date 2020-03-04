import React from 'react'
import { View } from 'react-native';
import { AuthNavProps } from '../navigation/types/AuthStackParams';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';

export const LoginScreen = ({}: AuthNavProps<'Login'>) => {
  const [name, setName] = React.useState('');
  const { login } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, marginTop: 12 }}>
      <Input 
        autoFocus
        placeholder="Your name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <View style={{ alignItems: 'center' }}>
        <Button
          title="Next"
          onPress={() => !!name && login(name)}
        />
      </View>
    </View>
  );
}