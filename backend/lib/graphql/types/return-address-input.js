/* @flow */

import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

const ReturnAddressInputType = new GraphQLInputObjectType({
  name: 'ReturnAddressInput',
  description: 'A return address input object',
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

export default ReturnAddressInputType;
