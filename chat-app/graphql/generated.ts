import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Timestamp: number,
  NEString: string,
};

export type DeviceMutation = {
   __typename?: 'DeviceMutation',
  register: Scalars['Boolean'],
  unregister: Scalars['Boolean'],
};


export type DeviceMutationRegisterArgs = {
  input: DeviceRegisterInput
};


export type DeviceMutationUnregisterArgs = {
  token: Scalars['NEString']
};

export enum DevicePlatform {
  IOS = 'IOS',
  ANDROID = 'ANDROID'
}

export type DeviceRegisterInput = {
  user_id: Scalars['NEString'],
  token: Scalars['NEString'],
  devicePlatform: DevicePlatform,
  deviceYear?: Maybe<Scalars['String']>,
  systemVersion?: Maybe<Scalars['String']>,
  deviceName?: Maybe<Scalars['String']>,
};

export type Message = {
   __typename?: 'Message',
  _id: Scalars['ID'],
  sender_id: Scalars['String'],
  senderName: Scalars['String'],
  text: Scalars['String'],
  date: Scalars['Timestamp'],
};

export type MessageSendInput = {
  sender_id: Scalars['NEString'],
  senderName: Scalars['NEString'],
  text: Scalars['NEString'],
};

export type MessagesMutation = {
   __typename?: 'MessagesMutation',
  send: Message,
};


export type MessagesMutationSendArgs = {
  input: MessageSendInput
};

export type Mutation = {
   __typename?: 'Mutation',
  messages: MessagesMutation,
  device: DeviceMutation,
};


export type Query = {
   __typename?: 'Query',
  messages: Array<Message>,
};


export type QueryMessagesArgs = {
  offset?: Scalars['Int'],
  limit?: Scalars['Int']
};

export type Subscription = {
   __typename?: 'Subscription',
  message: Message,
};


export type MessageItemFragment = (
  { __typename?: 'Message' }
  & Pick<Message, '_id' | 'sender_id' | 'senderName' | 'text' | 'date'>
);

export type RegisterDeviceMutationVariables = {
  input: DeviceRegisterInput
};


export type RegisterDeviceMutation = (
  { __typename?: 'Mutation' }
  & { device: (
    { __typename?: 'DeviceMutation' }
    & Pick<DeviceMutation, 'register'>
  ) }
);

export type UnregisterDeviceMutationVariables = {
  token: Scalars['NEString']
};


export type UnregisterDeviceMutation = (
  { __typename?: 'Mutation' }
  & { device: (
    { __typename?: 'DeviceMutation' }
    & Pick<DeviceMutation, 'unregister'>
  ) }
);

export type MessagesQueryVariables = {
  offset: Scalars['Int']
};


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & MessageItemFragment
  )> }
);

export type SendMessageMutationVariables = {
  input: MessageSendInput
};


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { messages: (
    { __typename?: 'MessagesMutation' }
    & { send: (
      { __typename?: 'Message' }
      & MessageItemFragment
    ) }
  ) }
);

export type MessageSubscriptionVariables = {};


export type MessageSubscription = (
  { __typename?: 'Subscription' }
  & { message: (
    { __typename?: 'Message' }
    & MessageItemFragment
  ) }
);

export const MessageItemFragmentDoc = gql`
    fragment MessageItem on Message {
  _id
  sender_id
  senderName
  text
  date
}
    `;
export const RegisterDeviceDocument = gql`
    mutation RegisterDevice($input: DeviceRegisterInput!) {
  device {
    register(input: $input)
  }
}
    `;
export type RegisterDeviceMutationFn = ApolloReactCommon.MutationFunction<RegisterDeviceMutation, RegisterDeviceMutationVariables>;

/**
 * __useRegisterDeviceMutation__
 *
 * To run a mutation, you first call `useRegisterDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerDeviceMutation, { data, loading, error }] = useRegisterDeviceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterDeviceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterDeviceMutation, RegisterDeviceMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterDeviceMutation, RegisterDeviceMutationVariables>(RegisterDeviceDocument, baseOptions);
      }
export type RegisterDeviceMutationHookResult = ReturnType<typeof useRegisterDeviceMutation>;
export type RegisterDeviceMutationResult = ApolloReactCommon.MutationResult<RegisterDeviceMutation>;
export type RegisterDeviceMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterDeviceMutation, RegisterDeviceMutationVariables>;
export const UnregisterDeviceDocument = gql`
    mutation UnregisterDevice($token: NEString!) {
  device {
    unregister(token: $token)
  }
}
    `;
export type UnregisterDeviceMutationFn = ApolloReactCommon.MutationFunction<UnregisterDeviceMutation, UnregisterDeviceMutationVariables>;

/**
 * __useUnregisterDeviceMutation__
 *
 * To run a mutation, you first call `useUnregisterDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnregisterDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unregisterDeviceMutation, { data, loading, error }] = useUnregisterDeviceMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUnregisterDeviceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnregisterDeviceMutation, UnregisterDeviceMutationVariables>) {
        return ApolloReactHooks.useMutation<UnregisterDeviceMutation, UnregisterDeviceMutationVariables>(UnregisterDeviceDocument, baseOptions);
      }
export type UnregisterDeviceMutationHookResult = ReturnType<typeof useUnregisterDeviceMutation>;
export type UnregisterDeviceMutationResult = ApolloReactCommon.MutationResult<UnregisterDeviceMutation>;
export type UnregisterDeviceMutationOptions = ApolloReactCommon.BaseMutationOptions<UnregisterDeviceMutation, UnregisterDeviceMutationVariables>;
export const MessagesDocument = gql`
    query Messages($offset: Int!) {
  messages(offset: $offset, limit: 20) {
    ...MessageItem
  }
}
    ${MessageItemFragmentDoc}`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = ApolloReactCommon.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($input: MessageSendInput!) {
  messages {
    send(input: $input) {
      ...MessageItem
    }
  }
}
    ${MessageItemFragmentDoc}`;
export type SendMessageMutationFn = ApolloReactCommon.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = ApolloReactCommon.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const MessageDocument = gql`
    subscription Message {
  message {
    ...MessageItem
  }
}
    ${MessageItemFragmentDoc}`;

/**
 * __useMessageSubscription__
 *
 * To run a query within a React component, call `useMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MessageSubscription, MessageSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<MessageSubscription, MessageSubscriptionVariables>(MessageDocument, baseOptions);
      }
export type MessageSubscriptionHookResult = ReturnType<typeof useMessageSubscription>;
export type MessageSubscriptionResult = ApolloReactCommon.SubscriptionResult<MessageSubscription>;