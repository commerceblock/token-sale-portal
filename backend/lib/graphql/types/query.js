import {
  GraphQLObjectType,
} from 'graphql';
import OrderType from '../types/order';
import ReturnAddressType from '../types/return-address'
import StageType from '../types/stage'
import db from '../database';

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    order: {
      type: OrderType,
      resolve: (parent, {}, context) => db.getOrder(context.userId),
    },
    returnAddress: {
      type: ReturnAddressType,
      resolve: (parent, {}, context) => db.getReturnAddress(context.userId),
    },
    lastStage: {
      type: StageType,
      resolve: (parent, {}, context) => db.getLastStage(context.userId),
    }
  }),
});

export default QueryType;
