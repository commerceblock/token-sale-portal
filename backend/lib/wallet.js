
//imports
import HDPublicKey from 'bitcore-lib/lib/hdpublickey'

// TODO, extract
const wallet_base = "xpub6FE2cVy8WLqKzCG7EMKR53KwQ2qPnf4vKHUUxVWwaDLbsv6PXbyVyHcSmzkoK4Vfvxq6YYkKWM4x3q2CEAY62JMgwvSoQagZC1MPTLGxpyK";
const wallet_base_hd_pk = new HDPublicKey(wallet_base);

export function generatePaymentAddress(coin, accountIndex) {
  return wallet_base_hd_pk.derive(`m/${accountIndex}`)
    .publicKey
    .toAddress()
    .toString();
}
