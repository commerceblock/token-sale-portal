
//imports
import { find } from 'lodash'
import HDPublicKey from 'bitcore-lib/lib/hdpublickey'

// local imports
import { event_type } from '../model/consts'
import { loadEvents } from '../lib/events-store';

// TODO, extract
const wallet_base = "xpub6FE2cVy8WLqKzCG7EMKR53KwQ2qPnf4vKHUUxVWwaDLbsv6PXbyVyHcSmzkoK4Vfvxq6YYkKWM4x3q2CEAY62JMgwvSoQagZC1MPTLGxpyK";
const wallet_base_hd_pk = new HDPublicKey(wallet_base);

export function generatePaymentAddress(userId, coin) {
  return loadEvents(userId)
    .then(events => {
      const account_created = find(events, { type: event_type.account_created });
      if (account_created) {
        const account_index = account_created.data.account_index;
        return wallet_base_hd_pk.derive(`m/${account_index}`).publicKey.toAddress().toString();
      }
    });
}
