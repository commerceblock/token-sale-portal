// imports
import { find, filter, first, size, isEmpty, map } from 'lodash';
import { createLogger } from 'bunyan';

// local imports
import { parseRecords } from '../lib/http-util';
import { event_type } from '../model/consts';
import { loadEvents } from '../lib/events-store';
import { loadCounter } from '../lib/tokens-counter-store';
import { saveAddressIndex } from '../lib/addresses-indexer-store';


// logging
const log = createLogger({ name: 'backoffice-address-indexer' });


export function handleSuccess(result, callback) {
  log.info('all records were processed successfully');
  callback();
}

export function handleError(error, callback) {
  log.error({ error }, 'failed to process records, abort batch');
  callback('abort batch');
}

export function createTask(event) {
  try {
    return loadEvents(event.user_id)
      .then(events => {
        return loadCounter()
          .then(counter => {
            const order_created = first(events, { type: event_type.order_created });
            const account_created = first(events, { type: event_type.account_created });

            const bouns = counter <= 80000000;
            const whitelist = true;
            const kyc = find(events, { type: event_type.account_kyc_created }) !== undefined;
            const spot_price = order_created.data.spot_price;
            const coin = order_created.data.coin;
            const sending_address = account_created.data.sending_address;

            return saveAddressIndex({
              address: sending_address,
              whitelist,
              bouns,
              kyc,
              spot_price,
              coin,
              timestamp: new Date().toISOString(),
            });
          });
      });
  } catch (error) {
    log.error({
      error,
      event,
    }, 'an error occured while processing event');
    throw new Error('an error occured while processing event');
  }
}

export function process(event, context, callback) {
  log.info(event, 'Received event');

  // parse event
  const events = parseRecords(event);
  const filteredEvents = filter(events, { type: event_type.order_created });
  if (isEmpty(events)) {
    log.info('empty batch');
    callback();
    return;
  }
  log.info(`processing ${size(filteredEvents)}`);
  Promise.all(map(filteredEvents, createTask))
    .then(result => handleSuccess(result, callback))
    .catch(error => handleError(error, callback));
}
