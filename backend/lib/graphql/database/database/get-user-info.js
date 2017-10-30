// imports
import { find } from 'lodash'

// local imports
import { event_type } from '../../../../model/consts';
import { loadEvents } from '../../../../lib/events-store';


export default async (userId) => {
  return loadEvents(userId)
    .then(events => {
      const account_kyc_created = find(events, { type: event_type.account_kyc_created });
      if (account_kyc_created) {
        return { kyc: true };
      }
      return { kyc: false };
    });
};
