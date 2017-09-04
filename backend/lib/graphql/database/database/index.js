import wrapLogger from '../../utils/wrap-logger';
import createOrder from './create-order';
import getOrder from './get-order';
import acknowledgeTerms from './acknowledge-terms'
import createReturnAddress from './create-return-address'
import getReturnAddress from './get-return-address'
import getLastStage from './get-last-stage'
import getTokenInformation from './get-token-information'
import getTickers from './get-tickers'

const database = {
  acknowledgeTerms,
  createReturnAddress,
  createOrder,
  getReturnAddress,
  getOrder,
  getLastStage,
  getTokenInformation,
  getTickers,
};

export default wrapLogger(database);
