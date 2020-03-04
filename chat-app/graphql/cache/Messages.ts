import * as React from 'react';
import UUID from 'uuid-random';
import { useMessagesQuery, MessageSubscription as MessageSubscriptionType, useSendMessageMutation, MessageSendInput, SendMessageMutation, MessagesQuery } from '../generated';
import { MessageSubscription, GetMessagesQuery } from '../queries/Messages';

export const useMessages = ({ sender_id }: { sender_id: string }) => {
  const [isStopFetchMore, setStopFetchMore] = React.useState(false);
  const { data, fetchMore: fetchMoreMessages, loading, subscribeToMore, ...other } = useMessagesQuery({ 
    fetchPolicy: 'cache-and-network',
    variables: { offset: 0 },
  });

  React.useEffect(() => {
    if (!data) {
      subscribeToMore<MessageSubscriptionType>({
        document: MessageSubscription,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) {
            return prev;
          }
          const newMessage = subscriptionData.data.message;
          if (sender_id === newMessage.sender_id) {
            return prev;
          }

          return {
            messages: [newMessage, ...prev.messages]
          };
        }
      });
    }
  }, [subscribeToMore]);

  const fetchMoreAndUpdateCache = React.useMemo(() => {
    return async (offset: number) => {
      await fetchMoreMessages({
        variables: { offset },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          
          const moreItems = fetchMoreResult.messages;
          if(moreItems.length < 1) {
            setStopFetchMore(true);
          }

          return {
            messages: [...prev.messages, ...moreItems]
          };
        }
      });
    };
  }, []);

  const fetchMore = React.useCallback(() => {
    if(!data || loading || isStopFetchMore) {
      return;
    }

    const offset = data.messages.length;
    if (offset >= 20) {
      fetchMoreAndUpdateCache(offset);
    }
  }, [isStopFetchMore, loading, data]);

  return { ...other, data, fetchMore, loading };
};

export const useSendMessage = () => {
  const [mutate] = useSendMessageMutation();

  const sendMessage = React.useCallback(async ({ sender_id, senderName, text }: MessageSendInput) => {
    const optimisticResponse: SendMessageMutation = { 
      messages: {
        __typename: 'MessagesMutation',
        send: {
          __typename: 'Message',
          _id: UUID(),
          sender_id,
          senderName,
          date: +new Date(),
          text,
        }
      }
    };

    await mutate({
      variables: {
        input: {
          sender_id,
          senderName,
          text
        }
      },
      optimisticResponse,
      update(client, { data }) {
        try {
          const { messages } = client.readQuery<MessagesQuery>({
            query: GetMessagesQuery,
            variables: { offset: 0 }
          });

          if (!messages) {
            return;
          }

          const message = data.messages.send;
          client.writeQuery<MessagesQuery>({
            query: GetMessagesQuery,
            variables: { offset: 0 },
            data: {
              messages: [
                message,
                ...messages
              ]
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  }, []);

  return sendMessage;
}