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
      description: 'token price in USD cents',
    },
    bounsPrecentage: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'token pre-sale bouns precentage',
    }
  }),
});

export default TokenInfo;
