/* @flow */
import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

const UserInfo = new GraphQLObjectType({
  name: 'UserInfo',
  description: 'A user info object',
  fields: () => ({
    kyc: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'kyc status',
    },
  }),
});

export default UserInfo;
