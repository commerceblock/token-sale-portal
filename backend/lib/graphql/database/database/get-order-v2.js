
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
        return {
          usdAmount: order_created.data.usd_amount,
          coin: order_created.data.coin,
          spotPrice: order_created.data.spot_price,
          paymentAddress: order_created.data.payment_address,
          invoiceId: order_created.data.invoice_id,
        };
      }
      return null;
    });
};
