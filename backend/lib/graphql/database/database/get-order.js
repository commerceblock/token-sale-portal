
// local imports
import { loadEvents } from '../../../../lib/events-store';

export default async (user_id) => {
  return loadEvents(userId)
    .then(events => {
      // TODO:: complete
      return null;
    });
};
