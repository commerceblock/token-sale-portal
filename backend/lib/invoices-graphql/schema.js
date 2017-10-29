import 'babel-polyfill'; // needed to for async/await

import { GraphQLSchema } from 'graphql';
import QueryType from './types/query';

export default new GraphQLSchema({
  query: QueryType,
});
