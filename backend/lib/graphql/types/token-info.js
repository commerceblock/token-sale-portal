/* @flow */

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
} from 'graphql';

const TokenInfo = new GraphQLObjectType({
  name: 'TokenInfo',
  description: 'A token info object',
  fields: () => ({
    unitPrice: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'CBT Tokens for 1 USD',
    },
    totalTokensSold: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Total tokens sold',
    },
  }),
});

export default TokenInfo;
