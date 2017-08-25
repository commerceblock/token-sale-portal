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
    orderId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The unique identifier of the trader',
    },
    ethereumReturnAddress: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The ethereum return address, this address will be used to receive CBT tokens',
    },
    ethereumWalletName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The ethereum wallet being used by user',
    },
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
      description: 'order coin (btc or eth)',
    },
  }),
});

export default OrderType;
