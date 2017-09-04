
// imports
import { map, includes } from 'lodash'

// local imports
import { event_type, stage_type } from '../../../../model/consts'
import { loadEvents } from '../../../../lib/events-store';

export default async (userId) => {
  return loadEvents(userId)
    .then(events => {
      const types = map(events, e => e.type);
      if (includes(types, event_type.order_created)) {
        return stage_type.order_created;
      } else if (includes(types, event_type.return_address_created)) {
        return stage_type.return_address_created;
      } else if (includes(types, event_type.terms_acknowledged)) {
        return stage_type.terms_acknowledged;
      } else {
        return stage_type.initial;
      }
    })
    .then(name => ({
      name
    }));
};
