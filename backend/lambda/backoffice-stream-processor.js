
// imports
import AWS from 'aws-sdk'
import {
  isEmpty,
  filter,
  includes,
 } from 'lodash'

// local imports
import {
  parseEvent,
} from '../lib/http-util'
import {
  event_type
} from '../model/consts'
import eventSQL from '../model/event-sql'
import sequelize from '../lib/sequelize'

// logging
import { createLogger } from 'bunyan'

const log = createLogger({ name: 'backoffice-stream-processor' });

const events_to_be_synced = [event_type.return_address_created, event_type.order_created];

export function process(event, context, callback) {
  log.info(event, 'Received event');
  // set callbackWaitsForEmptyEventLoop to false to exit without waiting for event loop
  // this is needed because of the background activity in sql driver
  // https://gist.github.com/hassy/eaea5a958067211f2fed02ead13c2678
  context.callbackWaitsForEmptyEventLoop = false;

  // parse event
  const events = parseEvent(event);
  const filteredEvents = filter(events, function(e){
    return includes(events_to_be_synced, e.type);
  });
  if (isEmpty(filteredEvents)) {
    log.info('empty batch');
    return callback();
  } else {
    eventSQL.bulkCreate(filteredEvents)
      .then(result => {
        const count = result.length || 0;
        log.info(`bulk created ${count}`);
        callback();
      })
      .catch(err => {
        log.error({ err }, 'failed to process events');
        callback(err);
      });
  }
}
