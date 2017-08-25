import { graphql } from 'graphql';
import Schema from './schema';

export default (query, variables, context) => (
  graphql(Schema, query, null, context, variables)
);
