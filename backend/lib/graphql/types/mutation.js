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
import db from '../database';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    acknowledgeTerms: {
      type: new GraphQLObjectType({
        name: 'AcknowledgeTermsResult',
        fields: () => ({
          acknowledged: { type: new GraphQLNonNull(GraphQLBoolean) },
        })
      }),
      description: 'Acknowledge terms',
      resolve: (value, args, context) => db.acknowledgeTerms(context.userId),
    },
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
  }),
});

export default MutationType;
