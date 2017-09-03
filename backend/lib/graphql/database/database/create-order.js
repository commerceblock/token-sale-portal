
// local imports
import { saveEvent } from '../../../../lib/events-store';
import { createOrderedId } from '../../../../lib/uuid';
import { event_type, order_status } from '../../../../model/consts';
import { generatePaymentAddress } from '../../../../lib/wallet';

export default async (userId, orderInput) => {
  const eventId = createOrderedId();
  const paymentAddress = generatePaymentAddress(userId, orderInput.coin);
  const payload = {
    user_id: userId,
    event_id: eventId,
    type: event_type.order_created,
    timestamp: new Date().toISOString(),
    data: {
      usd_amount: orderInput.usdAmount,
      coin: orderInput.coin,
      payment_address: paymentAddress,
    },
  };
  return saveEvent(payload)
    .then(payload => ({
      usdAmount: payload.data.usd_amount,
      coin: payload.data.coin,
      paymentAddress: payload.data.payment_address,
      status: order_status.initial,
      numnberOfConfirmations: 0
    }));
};
