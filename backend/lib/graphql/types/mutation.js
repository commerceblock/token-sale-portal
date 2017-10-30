/* @flow */

import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLObjectType,
} from 'graphql';
import OrderType from '../types/order';
import OrderInputType from '../types/order-input';
import ReturnAddressType from '../types/return-address';
import ReturnAddressInputType from '../types/return-address-input';
import OrderV2InputType from '../types/order-input-v2';
import OrderV2Type from '../types/order-v2';
import db from '../database';


const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createReturnAddress: {
      type: ReturnAddressType,
      description: 'Create a new return address',
      args: {
        returnAddress: { type: ReturnAddressInputType },
      },
      resolve: (value, { returnAddress }, context) => db.createReturnAddress(context.userId, returnAddress),
    },
    createOrder: {
      type: OrderType,
      description: 'Create a new order',
      args: {
        order: { type: OrderInputType },
      },
      resolve: (value, { order }, context) => db.createOrder(context.userId, order),
    },
    createOrderV2: {
      type: OrderV2Type,
      description: 'Create a new order v2',
      args: {
        order: { type: OrderV2InputType },
      },
      resolve: (value, { order }, context) => db.createOrderV2(context.userId, order),
    },
  }),
});

export default MutationType;
