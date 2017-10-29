/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

const OrderV2Type = new GraphQLObjectType({
  name: 'OrderV2',
  description: 'An order object',
  fields: () => ({
    invoiceId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'invoice id',
    },
    amountOfTokens: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'order amount of tokens',
    },
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

export default OrderV2Type;
