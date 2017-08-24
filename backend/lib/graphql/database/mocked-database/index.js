import wrapLogger from '../../utils/wrap-logger';
import wrapPromise from '../../utils/wrap-promise';

const database = {
  createOrder () { throw new Error('not implemented'); },
  getOrder () { throw new Error('not implemented'); },
};

export default wrapLogger(wrapPromise(database));
