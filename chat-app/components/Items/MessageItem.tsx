import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import { gql } from '@apollo/client';
import * as Types from '../../graphql/generated';

export const TIME_FORMAT = 'HH:mm';

export const MessageItemFragment = gql`
  fragment MessageItem on Message {
    _id
    sender_id
    senderName
    text
    date
  }
`;

interface MessageItemProps {
  isImSender: boolean;
  message: Types.MessageItemFragment;
}

export const MessageItem: React.FC<MessageItemProps> = ({ isImSender, message }) => (
  <View style={[styles.container, { justifyContent: isImSender ? 'flex-end' : 'flex-start' }]}> 
    {!isImSender && (
      <View style={styles.memberPicture}>
        <Picture 
          letter={message.senderName} 
          id={message.sender_id} 
        />
      </View>
    )}
    <View style={styles.bubbleSize}>
      <View style={[styles.bubble, { backgroundColor: isImSender ? '#007BFF' : '#F2F3F5' }]}>
        <View style={{ flexShrink: 1 }}>
          {!isImSender && (
            <Text style={styles.senderName}>
              {message.senderName}
            </Text>
          )}
          <Text style={[styles.messageText, { color: isImSender ? '#FFF' : '#262626' }]}>
            {message.text}
          </Text>
        </View>
        
        <View style={styles.bubbleTime}>
          <Text style={[styles.bubbleTimeText, { color: isImSender ? '#8FC5FF' : '#9D9FA3'  }]}>
            {moment(message.date).format(TIME_FORMAT)}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const getBackgroundColorByID = (id?: string) => {
  if (!id) {
    return '#F2F3F5';
  }

  const colors = ['#E57373','#F06292','#BA68C8','#9575CD','#7986CB','#64B5F6','#4DD0E1','#4FC3F7','#4DB6AC','#81C784','#AED581','#DCE775','#FFF176','#FFD54F','#FFB74D','#FF8A65','#A1887F','#E0E0E0','#90A4AE'];
  return colors[Math.abs(parseInt(id.replace(/\D/g, ''), 10)) % colors.length];
};

const Picture = (props: { letter: string; id: string; }) => {
  const backgroundColor = getBackgroundColorByID(props.id);

  return (
    <View style={[styles.pictureWrapper, { backgroundColor }]}>
      <Text style={styles.pictureLetter}>
        {props.letter.substr(0, 1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12, 
    marginVertical: 6, 
    flexDirection: 'row',
  },
  memberPicture: {
    paddingRight: 12, 
    alignSelf: 'flex-end'
  },
  bubble: {
    paddingVertical: 7, 
    paddingHorizontal: 12, 
    borderRadius: 18, 
    flexDirection: 'row', 
    alignItems:"stretch",
    flexWrap: 'wrap',
  },
  bubbleSize: {
    maxWidth: '80%', 
    flexDirection: 'column'
  },
  senderName: {
    fontSize: 15, 
    lineHeight: 20, 
    fontWeight: '500'
  },
  messageText: {
    fontSize: 17, 
    lineHeight: 22, 
    fontWeight: '400'
  },
  bubbleTime: {
    alignSelf: "stretch",
    flexGrow: 1, 
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  bubbleTimeText: {
    position: 'relative',
    lineHeight: 18,
    top: 2,
    fontSize: 13,
    paddingLeft: 8,
    fontWeight: '400'
  },
  pictureWrapper: {
    backgroundColor: '#597fab',
    width: 32,
    height: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureLetter: {
    fontWeight: '500',
    fontSize: 12,
    color: '#fff'
  },
});