import { GraphQLScalarType } from 'graphql';
import { Kind, ValueNode } from 'graphql/language';
import { gql } from 'apollo-server';

const parse = (v: string) => {
  if (v === undefined || v === null) {
    throw new Error('field should be String');
  }

  return v;
};

const literal = (ast: ValueNode) => {
  if (ast.kind === Kind.INT) {
    return parse(ast.value);
  }

  throw new Error('field should be String');
};

export default {
  declaration: gql`
    scalar Timestamp
  `,
  type: {
    Timestamp: new GraphQLScalarType({
      name: 'Timestamp',
      description: 'Timestamp format',
      serialize: parse,
      parseValue: parse,
      parseLiteral: literal
    }),
  }
};
