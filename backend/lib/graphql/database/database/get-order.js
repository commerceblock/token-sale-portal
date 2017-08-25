
// imports
import {
  find,
  size,
  filter
} from 'lodash'

// local imports
import {
  event_type,
  order_status
} from '../../../../model/consts'
import { loadEvents } from '../../../../lib/events-store';

export default async (userId) => {
  return loadEvents(userId)
    .then(events => {
      const order_created = find(events, { type: event_type.order_created });
      if (order_created) {
        const order_payment_broadcasted = find(events, { type: event_type.order_payment_broadcasted });
        const order_confirmed = find(events, { type: event_type.order_confirmed });
        const number_of_confirmations = size(filter(events, { type: event_type.order_payment_confirmed }));
        const status = resolveStatus(order_payment_broadcasted, order_confirmed, number_of_confirmations);
        return {
          orderId: order_created.data.order_id,
          ethereumReturnAddress: order_created.data.ethereum_return_address,
          ethereumWalletName: order_created.data.ethereum_wallet_name,
          amount: order_created.data.amount,
          coin: order_created.data.coin,
          paymentAddress: order_created.data.payment_address,
          status,
          numnberOfConfirmations: number_of_confirmations
        }
      }
      return null;
    });
};

export function resolveStatus(order_payment_broadcasted, order_confirmed, number_of_confirmations) {
  if (order_confirmed !== undefined) {
    return order_status.fulfilled;
  } else if (number_of_confirmations > 0) {
    return order_status.confirmed;
  } else if (order_payment_broadcasted !== undefined) {
    return order_status.unconfirmed;
  } else {
    return order_status.initial;
  }
}
