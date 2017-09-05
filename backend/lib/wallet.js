
//imports
import HDPublicKey from 'bitcore-lib/lib/hdpublickey'

// TODO, extract
const wallet_base = "tpubDFBphhFdsegGfcGeEy1qPLRsk4fFVr4MD447wGtZhkLCsE89SH8KL8c3YTSvG5GFtjufpHHB6SwK4BU3NxwynmCoySnv6tMNHShicxyrPW1";
const wallet_base_hd_pk = new HDPublicKey(wallet_base);

export function generatePaymentAddress(coin, accountIndex) {
  return wallet_base_hd_pk.derive(`m/${accountIndex}`)
    .publicKey
    .toAddress()
    .toString();
}
