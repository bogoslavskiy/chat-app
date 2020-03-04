import { GraphQLScalarType } from 'graphql';
import { Kind, ValueNode } from 'graphql/language';
import { gql } from 'apollo-server';

const parse = (v: string) => {
  if (v === undefined || v === null) {
    throw new Error('field should be String');
  }

  const str = String(v);

  if (str.length) {
    return str.trim();
  }

  throw new Error("field can't be empty");
};

const literal = (ast: ValueNode) => {
  if (ast.kind === Kind.STRING) {
    return parse(ast.value);
  }

  throw new Error('field should be String');
};

export default {
  declaration: gql`
    scalar NEString
  `,
  type: {
    NEString: new GraphQLScalarType({
      name: 'NEString',
      description: 'Alias `Non Empty String`',
      serialize: parse,
      parseValue: parse,
      parseLiteral: literal
    })
  }
};
