
// imports
import { find } from 'lodash'

// local imports
import { loadEvents, saveEvent } from '../../../../lib/events-store';
import { createOrderedId } from '../../../../lib/uuid';
import { event_type, order_status } from '../../../../model/consts';
import getTickers from './get-tickers'

export default async (userId, orderInput) => {
  return loadEvents(userId)
    .then(events => {
      return find(events, { type: event_type.account_created });
    })
    .then(account_created => {
      return getTickers()
        .then(tickers => ({
          account_created,
          tickers
        }));
    })
    .then(pair => {
      const account = pair.account_created;
      if (account && account.data && account.data.coin) {
        const spotPrice = pair.tickers[pair.account_created.data.coin]
        const payload = {
          user_id: userId,
          event_id: createOrderedId(),
          type: event_type.order_created,
          timestamp: new Date().toISOString(),
          data: {
            usd_amount: orderInput.usdAmount,
            spot_price: spotPrice,
          },
        };
        return saveEvent(payload);
      }
    })
    .then(payload => {
      if (payload) {
        return {
          usdAmount: payload.data.usd_amount,
          coin: payload.data.coin,
          paymentAddress: payload.data.payment_address,
          status: order_status.initial,
          numnberOfConfirmations: 0
        }
      } else {
        return null;
      }
    });
};
