import {
  GraphQLObjectType,
} from 'graphql';
import OrderType from '../types/order';
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
  }),
});

export default QueryType;
