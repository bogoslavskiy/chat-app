import { makeExecutableSchema } from 'graphql-tools';
import merge = require('lodash/merge');
import Scalars from './scalars';

// Modules
import Messages from './resolvers/Messages';
import Device from './resolvers/Device';

const Modules = {
  typeDefs: [
    Messages.typeDefs,
    Device.typeDefs,
  ],
  resolvers: merge(
    Messages.resolvers,
    Device.resolvers
  )
};


const schema = makeExecutableSchema({
  typeDefs: [
    ...Scalars.declarations,
    ...Modules.typeDefs
  ],
  resolvers: {
    ...Scalars.resolvers,
    ...Modules.resolvers
  }
});

export default schema;
