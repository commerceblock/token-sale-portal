
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
const log = createLogger({ name: 'orders-backoffice-stream-processor' });

// TOD: inject externally
const queue_url = `https://sqs.${account_region}.amazonaws.com/${account_number}/${env_name}-orders`

const sqs = new AWS.SQS();

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
  // TODO
  const message = {
    user_id: event.user_id
  }
  var params = {
    MessageBody: JSON.stringify(message),
    QueueUrl: queue_url
   };
   sqs.sendMessage(params).promise();
};
