import { ApolloClient, split, HttpLink, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';
import Introspection from './introspection-result.json';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: { reconnect: true }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql'
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  cache: new InMemoryCache({ ...Introspection }),
  link: splitLink
});