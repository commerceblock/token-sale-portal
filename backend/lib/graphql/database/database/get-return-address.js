
// imports
import { find } from 'lodash'

// local imports
import { event_type } from '../../../../model/consts'
import { loadEvents } from '../../../../lib/events-store';

export default async (userId) => {
  return loadEvents(userId)
    .then(events => {
      const return_address_created = find(events, { type: event_type.return_address_created });
      if (return_address_created) {
        return {
          ethereumReturnAddress: return_address_created.data.ethereum_return_address,
          ethereumWalletProvider: return_address_created.data.ethereum_wallet_provider,
        }
      }
      return null;
    });
};
