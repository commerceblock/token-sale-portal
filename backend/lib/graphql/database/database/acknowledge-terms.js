
// local imports
import { saveEvent } from '../../../../lib/events-store';
import { createOrderedId } from '../../../../lib/uuid';
import { event_type } from '../../../../model/consts';
import { generatePaymentAddress } from '../../../../lib/wallet';

export default async (userId, orderInput) => {
  const eventId = createOrderedId();
  const payload = {
    user_id: userId,
    event_id: eventId,
    type: event_type.terms_acknowledged,
    timestamp: new Date().toISOString(),
    data: {
    },
  };
  return saveEvent(payload)
    .then(payload => ({
      acknowledged: true
    }));
};
