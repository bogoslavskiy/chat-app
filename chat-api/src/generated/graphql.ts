import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Message: ResolverTypeWrapper<Message>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>,
  Mutation: ResolverTypeWrapper<{}>,
  MessagesMutation: ResolverTypeWrapper<MessagesMutation>,
  MessageSendInput: MessageSendInput,
  NEString: ResolverTypeWrapper<Scalars['NEString']>,
  DeviceMutation: ResolverTypeWrapper<DeviceMutation>,
  DeviceRegisterInput: DeviceRegisterInput,
  DevicePlatform: DevicePlatform,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Subscription: ResolverTypeWrapper<{}>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Int: Scalars['Int'],
  Message: Message,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Timestamp: Scalars['Timestamp'],
  Mutation: {},
  MessagesMutation: MessagesMutation,
  MessageSendInput: MessageSendInput,
  NEString: Scalars['NEString'],
  DeviceMutation: DeviceMutation,
  DeviceRegisterInput: DeviceRegisterInput,
  DevicePlatform: DevicePlatform,
  Boolean: Scalars['Boolean'],
  Subscription: {},
}>;

export type DeviceMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeviceMutation'] = ResolversParentTypes['DeviceMutation']> = ResolversObject<{
  register?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<DeviceMutationRegisterArgs, 'input'>>,
  unregister?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<DeviceMutationUnregisterArgs, 'token'>>,
}>;

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  sender_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  senderName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  date?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>,
}>;

export type MessagesMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessagesMutation'] = ResolversParentTypes['MessagesMutation']> = ResolversObject<{
  send?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MessagesMutationSendArgs, 'input'>>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  messages?: Resolver<ResolversTypes['MessagesMutation'], ParentType, ContextType>,
  device?: Resolver<ResolversTypes['DeviceMutation'], ParentType, ContextType>,
}>;

export interface NeStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NEString'], any> {
  name: 'NEString'
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessagesArgs, 'offset' | 'limit'>>,
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  message?: SubscriptionResolver<ResolversTypes['Message'], "message", ParentType, ContextType>,
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp'
}

export type Resolvers<ContextType = any> = ResolversObject<{
  DeviceMutation?: DeviceMutationResolvers<ContextType>,
  Message?: MessageResolvers<ContextType>,
  MessagesMutation?: MessagesMutationResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  NEString?: GraphQLScalarType,
  Query?: QueryResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  Timestamp?: GraphQLScalarType,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
