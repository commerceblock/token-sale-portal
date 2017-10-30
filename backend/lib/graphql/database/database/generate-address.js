import { master_pub_key, ether_multisig } from '../../../../model/consts';
import HDPublicKey from 'bitcore-lib/lib/hdpublickey';
import paymentIdSQL from '../../../../model/payment-id-sql';
import Networks from 'bitcore-lib/lib/networks'

import { createLogger } from 'bunyan';

const log = createLogger({ name: 'generate-address' });

const network = process.env.MAINNET === 'true' ? Networks.livenet : Networks.testnet;

export async function generatePaymentAddress(user_id, coin) {
  if (coin === 'ETH' || coin === 'tETH') {
    return generateETHAddress(user_id, coin);
  }
  const hdPublicKey = new HDPublicKey(master_pub_key);
  // generate payment id
  return generatePaymentId(user_id)
    .then(id => {
      return hdPublicKey.derive(`m/${id}`).publicKey.toAddress(network).toString();
  }).catch(error => {
    log.error(error);
  });
}


export async function generatePaymentId(user_id) {
  return paymentIdSQL.create({
    user_id,
    timestamp: new Date().toISOString(),
  }).then(result => {
    return result.payment_id;
  }).catch(error => {
    log.error(error);
  });
}

export function generateETHAddress(user_id, coin) {
  return Promise.resolve(ether_multisig);
}
