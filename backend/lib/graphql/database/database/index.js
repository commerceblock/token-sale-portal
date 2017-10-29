import wrapLogger from '../../utils/wrap-logger';
import createOrder from './create-order';
import getOrder from './get-order';
import createReturnAddress from './create-return-address';
import getReturnAddress from './get-return-address';
import getLastStage from './get-last-stage';
import getTokenInformation from './get-token-information';
import getTickers from './get-tickers';
import getUserInfo from './get-user-info';
import createOrderV2 from '../database/create-order-v2';

const database = {
  createReturnAddress,
  createOrder,
  getReturnAddress,
  createOrderV2,
  getOrder,
  getLastStage,
  getTokenInformation,
  getTickers,
  getUserInfo,
};

export default wrapLogger(database);
