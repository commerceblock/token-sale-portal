
// imports

// local imports
import {
  parseEvent,
  executePromises,
} from '../lib/http-util';
import { event_type } from '../model/consts';

// logging
import { createLogger } from 'bunyan';
const log = createLogger({ name: 'orders-backoffice-stream-processor' });

export function process(event, context, callback) {
  log.info(event, 'Received event');
  // parse events
  const events = httpUtil.parseEvent(event);
  // filter events
  const filteredEvents = _.filter(events, {
    type: event_type.order_created
  });
  // build promises
  const promises = Promise.all(_.map(filteredEvents, createPromise));
  // execute promises
  return executePromises(promises, log, callback);
};

const createPromise = (event) => {
  return new Promise((resolve, reject) => {
    // TODO
  });
};
