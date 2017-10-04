
// imports
import AWS from 'aws-sdk'
import { isEmpty } from 'lodash'

// local imports
import {
  parseEvent,
} from '../lib/http-util'
import eventSQL from '../model/event-sql'
import sequelize from '../lib/sequelize'

// logging
import { createLogger } from 'bunyan'

const log = createLogger({ name: 'backoffice-stream-processor' });


export function process(event, context, callback) {
  log.info(event, 'Received event');
  // set callbackWaitsForEmptyEventLoop to false to exit without waiting for event loop
  // this is needed because of the background activity in sql driver
  // https://gist.github.com/hassy/eaea5a958067211f2fed02ead13c2678
  context.callbackWaitsForEmptyEventLoop = false;

  // parse events
  const events = parseEvent(event);
  if (isEmpty(events)) {
    log.info('empty batch');
    return callback();
  } else {
    eventSQL.bulkCreate(events)
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
