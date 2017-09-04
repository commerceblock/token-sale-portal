/* @flow */

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';

const Tickers = new GraphQLObjectType({
  name: 'Tickers',
  description: 'A stage name',
  fields: () => ({
    btc: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '1 btc price in USD cents',
    },
    eth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '1 eth price in USD cents',
    },
  }),
});

export default Tickers;
