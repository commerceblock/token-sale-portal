
// local imports
import { saveEvent } from '../../../../lib/events-store';
import { createOrderedId } from '../../../../lib/uuid';
import { event_type } from '../../../../model/consts';
import { generatePaymentAddress } from '../../../../lib/wallet';

export default async (user_id, orderInput) => {
  const event_id = createOrderedId();
  const paymentAddress = generatePaymentAddress(orderInput.coin)
  const payload = {
    user_id,
    event_id,
    type: event_type.order_created,
    timestamp: new Date().toISOString(),
    data: {
      order_id: createOrderedId(),
      ethereum_return_address: orderInput.ethereumReturnAddress,
      ethereum_wallet_name: orderInput.ethereumWalletName,
      amount: orderInput.amount,
      coin: orderInput.coin,
      payment_address: paymentAddress,
    },
  };
  return saveEvent(payload)
    .then(payload => ({
      orderId: payload.data.order_id,
      ethereumReturnAddress: payload.data.ethereum_return_address,
      ethereumWalletName: payload.data.ethereum_wallet_name,
      amount: payload.data.amount,
      coin: payload.data.coin,
      paymentAddress: payload.data.payment_address,
      status: 'initial',
      numnberOfConfirmations: 0
    }));
};
