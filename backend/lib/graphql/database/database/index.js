import wrapLogger from '../../utils/wrap-logger';
import createOrder from './create-order';
import getOrder from './get-order';
import acknowledgeTerms from './acknowledge-terms'
import createReturnAddress from './create-return-address'
import getReturnAddress from './get-return-address'
import getLastStage from './get-last-stage'

const database = {
  acknowledgeTerms,
  createReturnAddress,
  createOrder,
  getReturnAddress,
  getOrder,
  getLastStage,
};

export default wrapLogger(database);
