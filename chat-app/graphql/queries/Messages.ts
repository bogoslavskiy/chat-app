import { gql } from '@apollo/client';
import { MessageItemFragment } from '../../components/Items/MessageItem';

export const GetMessagesQuery = gql`
  query Messages($offset: Int!) {
    messages(offset: $offset, limit: 20) {
      ...MessageItem
    }
  }

  ${MessageItemFragment}
`;

export const SendMessageMutation = gql`
  mutation SendMessage($input: MessageSendInput!) {
    messages {
      send(input: $input) {
        ...MessageItem
      }
    }
  }

  ${MessageItemFragment}
`;

export const MessageSubscription = gql`
  subscription Message {
    message {
      ...MessageItem
    }
  }

  ${MessageItemFragment}
`;