/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

const ReturnAddress = new GraphQLObjectType({
  name: 'ReturnAddress',
  description: 'A return address',
  fields: () => ({
    ethereumReturnAddress: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The ethereum return address, this address will be used to receive CBT tokens',
    },
    ethereumWalletProvider: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The ethereum wallet provider that is being used by user',
    }
  }),
});

export default ReturnAddress;
