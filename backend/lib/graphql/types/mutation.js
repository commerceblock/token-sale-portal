/* @flow */

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import OrderType from '../types/order';
import OrderInputType from '../types/order-input';
import db from '../database';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createOrder: {
      type: OrderType,
      description: 'Create a new order',
      args: {
        order: { type: OrderInputType },
      },
      resolve: (value, { order }, context) => db.createOrder(context.userId, order),
    },
  }),
});

export default MutationType;
