// imports
import { find } from 'lodash';

// local imports
import { loadEvents, saveEvent } from '../../../../lib/events-store';
import { createOrderedId, createId } from '../../../../lib/uuid';
import { event_type, order_status } from '../../../../model/consts';
import getTickers from './get-tickers';


export function generatePaymentAddress() {
  // TODO
  return '0x00000021312312'
}

export function computeAmountOfTokens(amount) {
  // TODO
  return parseInt(amount) * 16
}

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
        const coin = account.data.coin;
        const spotPrice = pair.tickers[coin];
        const paymentAddress = generatePaymentAddress();
        const amountOfTokens = computeAmountOfTokens(orderInput.usdAmount)
        const payload = {
          user_id: userId,
          event_id: createOrderedId(),
          invoice_id: createId(),
          type: event_type.order_created,
          timestamp: new Date().toISOString(),
          data: {
            ethereum_return_address: orderInput.ethereumReturnAddress,
            usd_amount: orderInput.usdAmount,
            spot_price: spotPrice,
            coin: coin,
            payment_address: paymentAddress,
            amount_of_tokens: amountOfTokens,
          },
        };
        return saveEvent(payload)
          .then(() => ({
            invoiceId: payload.invoice_id,
            amountOfTokens: payload.amount_of_tokens,
            usdAmount: payload.data.usd_amount,
            coin: coin,
            spotPrice: spot_price,
            paymentAddress: payload.data.payment_address,
          }));
      }
      return null;
    });
};
