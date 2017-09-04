
// local imports
import { saveEvent } from '../../../../lib/events-store';
import { createOrderedId } from '../../../../lib/uuid';
import { event_type } from '../../../../model/consts';

export default async (userId, returnAddressInput) => {
  const payload = {
    user_id: userId,
    event_id: createOrderedId(),
    type: event_type.return_address_created,
    timestamp: new Date().toISOString(),
    data: {
      ethereum_return_address: returnAddressInput.ethereumReturnAddress,
      ethereum_wallet_provider: returnAddressInput.ethereumWalletProvider,
    },
  };
  return saveEvent(payload)
    .then(payload => ({
      ethereumReturnAddress: payload.data.ethereum_return_address,
      ethereumWalletProvider: payload.data.ethereum_wallet_provider,
    }));
};
