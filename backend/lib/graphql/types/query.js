import {
  GraphQLObjectType,
} from 'graphql';
import OrderType from '../types/order';
import ReturnAddressType from '../types/return-address'
import StageType from '../types/stage'
import TokenInfoType from '../types/token-info'
import TickersType from '../types/tickers'
import UserInfoType from '../types/user-info'
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
    },
    tokenInformation: {
      type: TokenInfoType,
      resolve: (parent, {}, context) => db.getTokenInformation(context.userId),
    },
    tickers: {
      type: TickersType,
      resolve: (parent, {}, context) => db.getTickers(context.userId),
    },
    userInfo: {
      type: UserInfoType,
      resolve: (parent, {}, context) => db.getUserInfo(context.userId),
    },
  }),
});

export default QueryType;
