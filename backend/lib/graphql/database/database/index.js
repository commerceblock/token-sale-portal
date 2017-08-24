import wrapLogger from '../../utils/wrap-logger';
import createOrder from './create-order';
import getOrder from './get-order';

const database = {
  createOrder,
  getOrder,
};

export default wrapLogger(database);
