// imports
import {
  last
} from 'lodash';

// local imports
import {
  event_type,
  order_status,
} from '../../../../model/consts';
import { loadEvents } from '../../../../lib/events-store';

export default async (userId) => {
  return loadEvents(userId)
    .then(events => {
      const order_created = last(events, { type: event_type.order_created });
      if (order_created) {
        const diff = new Date() - new Date(order_created.timestamp);
        if (diff > 1000 * 60 * 60) {
          return null;
        }
        return {
          invoiceId: order_created.invoice_id,
          amountOfTokens: order_created.data.amount_of_tokens,
          usdAmount: order_created.data.usd_amount,
          coin: order_created.data.coin,
          spotPrice: order_created.data.spot_price,
          paymentAddress: order_created.data.payment_address,
          ethereumReturnAddress: order_created.data.ethereum_return_address,
        };
      }
      return null;
    });
};
