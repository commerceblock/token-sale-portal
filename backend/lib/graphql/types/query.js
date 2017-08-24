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
      resolve(parent, {}) {
        return db.getOrder(userId); // TODO inject user_id from access_token_id
      },
    },
  }),
});

export default QueryType;
