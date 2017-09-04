
// local imports
import { saveEvent } from '../../../../lib/events-store';
import { createOrderedId } from '../../../../lib/uuid';
import { event_type, order_status } from '../../../../model/consts';
import { generatePaymentAddress } from '../../../../lib/wallet';

export default async (userId, orderInput) => {
  return generatePaymentAddress(userId, orderInput.coin)
    .then(paymentAddress => {
      const payload = {
        user_id: userId,
        event_id: createOrderedId(),
        type: event_type.order_created,
        timestamp: new Date().toISOString(),
        data: {
          usd_amount: orderInput.usdAmount,
          coin: orderInput.coin,
          payment_address: paymentAddress,
        },
      };
      return saveEvent(payload);
    })
    .then(payload => ({
      usdAmount: payload.data.usd_amount,
      coin: payload.data.coin,
      paymentAddress: payload.data.payment_address,
      status: order_status.initial,
      numnberOfConfirmations: 0
    }));
};
