/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

const Stage = new GraphQLObjectType({
  name: 'Stage',
  description: 'A stage name',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Stage name',
    }
  }),
});

export default Stage;
