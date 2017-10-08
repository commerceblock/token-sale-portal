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
    BTC: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '1 BTC price in USD cents',
    },
    ETH: {
      type: new GraphQLNonNull(GraphQLInt),
      description: '1 ETH price in USD cents',
    },
  }),
});

export default Tickers;
