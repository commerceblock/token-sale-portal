/* @flow */

import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

const OrderInputV2Type = new GraphQLInputObjectType({
  name: 'OrderInputV2',
  description: 'A profile input object',
  fields: () => ({
    usdAmount: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'order amount',
    },
    ethereumReturnAddress: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'order amount',
    },
  }),
});

export default OrderInputV2Type;
