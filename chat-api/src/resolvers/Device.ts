import { gql } from 'apollo-server-express';
import { DeviceMutationResolvers, QueryResolvers } from '../generated/graphql';
import DeviceTokenModel from '../models/DeviceTokenModel';

const typeDefs = gql`
  enum DevicePlatform {
    IOS
    ANDROID
  }

  input DeviceRegisterInput {
    user_id: NEString!
    token: NEString!
    devicePlatform: DevicePlatform!
    deviceYear: String
    systemVersion: String
    deviceName: String
  }

  type DeviceMutation {
    register(input: DeviceRegisterInput!): Boolean!
    unregister(token: NEString!): Boolean!
  }

  extend type Mutation {
    device: DeviceMutation!
  }
`;

const DeviceMutation: DeviceMutationResolvers = {
  async register(_, { input }) {
    const exisingToken = await DeviceTokenModel.findOne({
      token: input.token,
      user_id: input.user_id
    });

    if (!exisingToken) {
      const deviceToken = new DeviceTokenModel(input);
      await deviceToken.save();
    }

    return true;
  },
  async unregister(_, { token }) {
    const deviceToken = await DeviceTokenModel.findOne({ token });

    if (deviceToken) {
      await deviceToken.remove();
      return true;
    }

    return false;
  }
};

const resolvers = {
  Mutation: {
    device: () => ({}),
  },
  DeviceMutation
};

export default { typeDefs, resolvers };