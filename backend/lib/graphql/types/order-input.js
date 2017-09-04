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
    usdAmount: {
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
