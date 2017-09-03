import wrapLogger from '../../utils/wrap-logger';
import wrapPromise from '../../utils/wrap-promise';

const database = {
  acknowledgeTerms () { throw new Error('not implemented'); },
  createReturnAddress () { throw new Error('not implemented'); },
  createOrder () { throw new Error('not implemented'); },
  getReturnAddress () { throw new Error('not implemented'); },
  getOrder () { throw new Error('not implemented'); },
};

export default wrapLogger(wrapPromise(database));
