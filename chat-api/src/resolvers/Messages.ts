import { gql } from 'apollo-server-express';
import { PubSub } from 'apollo-server';
import { QueryResolvers, MessagesMutationResolvers } from '../generated/graphql';
import { sendPushNotification } from '../utils/Notifications';
import MessageModel from '../models/MessageModel';

const NEW_MESSAGE_EVENT = 'NEW_MESSAGE';

const pubsub = new PubSub();

const typeDefs = gql`
  type Message {
    _id: ID!
    sender_id: String!
    senderName: String!
    text: String!
    date: Timestamp!
  }

  input MessageSendInput {
    sender_id: NEString!
    senderName: NEString!
    text: NEString!
  }

  type MessagesMutation {
    send(input: MessageSendInput!): Message!
  }

  type Mutation {
    messages: MessagesMutation!
  }

  type Query {
    messages(offset: Int! = 0, limit: Int! = 20): [Message!]!
  }

  type Subscription {
    message: Message!
  }
`;

const Query: QueryResolvers = {
  async messages(_, { offset, limit }) {
    const messages = await MessageModel
      .find()
      .limit(Math.min(limit, 100))
      .skip(offset)
      .sort({ date: -1 });

    return messages;
  } 
};

const MessagesMutation: MessagesMutationResolvers = {
  async send(_, { input }) {
    const message = new MessageModel(input);
    await message.save();

    pubsub.publish(NEW_MESSAGE_EVENT, { message });

    sendPushNotification({
      title: input.senderName,
      body: message.text,
    });

    return message;
  }
};

const resolvers = {
  Query,
  Mutation: {
    messages: () => ({}),
  },
  MessagesMutation,
  Subscription: {
    message: {
      subscribe: () => pubsub.asyncIterator([NEW_MESSAGE_EVENT]),
    },
  },
};

export default { typeDefs, resolvers };