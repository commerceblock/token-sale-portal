
// imports
import { find } from 'lodash'

// local imports
import { loadEvents, saveEvent } from '../../../../lib/events-store';
import { createOrderedId } from '../../../../lib/uuid';
import { event_type, order_status } from '../../../../model/consts';
import { generatePaymentAddress } from '../../../../lib/wallet';
import getTickers from './get-tickers'

export default async (userId, orderInput) => {
  const addressIndex = Math.floor(Math.random() * 1000000);
  return loadEvents(userId)
    .then(events => {
      // workaround
      // const account_created = find(events, { type: event_type.account_created });
      // const addrIndex = account_created.data.account_index;
      return generatePaymentAddress(orderInput.coin, addressIndex)
    })
    .then(paymentAddress => {
      return getTickers()
        .then(tickers => ({
          paymentAddress,
          tickers
        }));
    })
    .then(pair => {
      if (pair.paymentAddress) {
        const spotPrice = pair.tickers[orderInput.coin];
        const payload = {
          user_id: userId,
          event_id: createOrderedId(),
          type: event_type.order_created,
          timestamp: new Date().toISOString(),
          data: {
            usd_amount: orderInput.usdAmount,
            coin: orderInput.coin,
            payment_address: pair.paymentAddress,
            spot_price: spotPrice,
            address_index: addressIndex
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
