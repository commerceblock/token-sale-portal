
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
        const order_transaction_broadcasted = find(events, { type: event_type.order_transaction_broadcasted });
        const order_confirmed = find(events, { type: event_type.order_confirmed });
        const number_of_confirmations = size(filter(events, { type: event_type.order_transaction_confirmed }));
        const status = resolveStatus(order_transaction_broadcasted, order_confirmed, number_of_confirmations);
        const transactionLink = extractTransactionLink(order_transaction_broadcasted);
        return {
          usdAmount: order_created.data.usd_amount,
          coin: order_created.data.coin,
          spotPrice: order_created.data.spot_price,
          paymentAddress: order_created.data.payment_address,
          status,
          numnberOfConfirmations: number_of_confirmations,
          transactionLink: transactionLink
        };
      }
      return null;
    });
};

export function extractTransactionLink(event) {
  if (event && event.data && event.data.transaction_link) {
    return event.data.transaction_link;
  }
  return null;
}

export function resolveStatus(order_transaction_broadcasted, order_confirmed, number_of_confirmations) {
  if (order_confirmed !== undefined) {
    return order_status.fulfilled;
  } else if (number_of_confirmations > 0) {
    return order_status.confirmed;
  } else if (order_transaction_broadcasted !== undefined) {
    return order_status.unconfirmed;
  } else {
    return order_status.initial;
  }
}
