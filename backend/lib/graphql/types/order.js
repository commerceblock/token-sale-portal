/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

const OrderType = new GraphQLObjectType({
  name: 'Order',
  description: 'An order object',
  fields: () => ({
    usdAmount: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'order amount in USD',
    },
    coin: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'order coin (BTC or ETH)',
    },
    spotPrice: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'order coin (BTC or ETH) spot price',
    },
    paymentAddress: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'order payment address',
    },
  }),
});

export default OrderType;
