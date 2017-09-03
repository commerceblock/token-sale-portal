/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const OrderType = new GraphQLObjectType({
  name: 'Order',
  description: 'An order object',
  fields: () => ({
    amount: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'order amount',
    },
    coin: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'order coin (btc or eth)',
    },
    paymentAddress: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'order payment address',
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'order status (initial, unconfirmed, confirmed, fulfilled)',
    },
    numnberOfConfirmations: {
      type: GraphQLInt,
      description: 'number of confirmations',
    },
  }),
});

export default OrderType;
