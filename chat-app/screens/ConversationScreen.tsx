import React from 'react'
import { View, ActivityIndicator, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { Ionicons } from '@expo/vector-icons';
import { MainNavProps } from '../navigation/types/MainStackParams';
import { AuthContext } from '../contexts/AuthContext';
import { useMessages, useSendMessage } from '../graphql/cache/Messages';
import { MessageList } from '../components/MessageList';
import { MessageItem } from '../components/Items/MessageItem';
import { Button } from '../components/Button';
import { isIphoneX } from '../utils';
import { useKeyboard } from '../hooks/useKeyboard';

export const ConversationScreen = ({ navigation }: MainNavProps<'Conversation'>) => {
  const [inputValue, setInputValue] = React.useState('');
  const [isVisibleKeyboard] = useKeyboard();
  const { logout, user }  = React.useContext(AuthContext);
  const { data, loading, fetchMore } = useMessages({ sender_id: user._id });
  const sendMessage = useSendMessage();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => logout()} title="Logout" />
      ),
    });
  }, [navigation, logout]);

  return (
    <View style={{ flex: 1 }}>
      <MessageList
        inverted
        onEndReached={fetchMore}
        onEndReachedThreshold={0.7}
        ListFooterComponent={() => (
          <>
            {loading && <ActivityIndicator size="small" />} 
          </>
        )}
        data={data ? data.messages : []}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <MessageItem
            message={item}
            isImSender={item.sender_id === user._id}
          />
        )}
      />
      <KeyboardAccessoryView
        style={{ backgroundColor: '#FFF' }}
        alwaysVisible
        avoidKeyboard
        bumperHeight={30}
        hideBorder
      >
        <View style={styles.accessoryContainer}>
          <TextInput
            multiline
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
            placeholder={'Message'}
            placeholderTextColor={'#9D9FA3'}
            style={styles.input}
          />
          <TouchableOpacity 
            onPress={() => {
              sendMessage({ 
                sender_id: user._id,
                senderName: user.name, 
                text: inputValue 
              });
              setInputValue('');
            }}
            style={[styles.buttonSend, { opacity: inputValue ? 1 : 0.5 }]}
            disabled={!inputValue}
          >
            <Ionicons 
              name="md-arrow-up"
              size={18}
              color={'#FFF'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAccessoryView>

      {isIphoneX && !isVisibleKeyboard && (
        <View style={{ height: 30 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  accessoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  input: {
    flex: 1,
    borderRadius: 18,
    paddingBottom: Platform.OS === "android" ? 6 : 9,
    paddingTop: Platform.OS === "android" ? 5 : 8,
    paddingHorizontal: 12,
    fontSize: 17,
    flexGrow: 1,
    lineHeight: 20,
    maxHeight: isIphoneX ? 200 : 100,
    minHeight: 36,
    color: '#262626',
    backgroundColor: '#F2F3F5'
  },
  buttonSend: {
    marginLeft: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: '#007BFF'
  }
});