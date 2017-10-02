
// imports
import AWS from 'aws-sdk';

// local imports
import {
  parseEvent,
  executePromises,
} from '../lib/http-util';
import {
  event_type,
  env_name,
  account_region,
  account_number,
} from '../model/consts';

// logging
import { createLogger } from 'bunyan';
const log = createLogger({ name: 'backoffice-stream-processor' });


export function process(event, context, callback) {
  log.info(event, 'Received event');
  // parse events
  const events = httpUtil.parseEvent(event);
  // build promises
  const promises = Promise.all(_.map(events, createPromise));
  // execute promises
  return executePromises(promises, log, callback);
};

const createPromise = (event) => {
  // TODO
  const message = {
    user_id: event.user_id
  }
};
