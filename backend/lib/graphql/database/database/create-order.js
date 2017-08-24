
// local imports
import { saveEvent } from '../../../../lib/events-store';
import { createOrderedId } from '../../../../lib/uuid';
import { event_type } from '../../../../model/consts';
import { computeSignature } from '../../../../lib/item-util';

export default async (user_id, orderInput) => {
  // TODO:: complete
  const event_id = createOrderedId();
  const payload = {
    user_id,
    event_id,
    type: event_type.order_created,
    timestamp: new Date().toISOString(),
    data: {
      // TODO:: complete
    },
  };
  return saveEvent(payload)
    .then(payload => ({
    }));
};
