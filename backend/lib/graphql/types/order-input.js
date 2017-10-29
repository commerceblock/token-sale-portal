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
    }
  }),
});

export default OrderInputType;
