/* @flow */

import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

const OrderInputType = new GraphQLInputObjectType({
  name: 'OrderInput',
  description: 'A profile input object',
  fields: () => ({
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
  }),
});

export default OrderInputType;
