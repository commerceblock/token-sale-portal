
// imports
import 'whatwg-fetch';
import Consumer from 'sqs-consumer';
import {
  find,
  size,
  filter,
  isEmpty,
  first
} from 'lodash';
import httpStatus from 'http-status-codes';

// local imports
import {
  event_type,
  env_name,
  account_number,
  account_region
} from '../model/consts';
import {
  loadEvents,
  saveEvent
} from '../lib/events-store';

// logging
import { createLogger } from 'bunyan';
const log = createLogger({ name: 'orders-backoffice-stream-processor' });

const queue_url = `https://sqs.${account_region}.amazonaws.com/${account_number}/${env_name}-orders`;
const batch_size = 10;
const consumer_timeout = 10000; // 20 sec

const insight_api = 'https://test-insight.bitpay.com/api'

export function process(event, context, callback) {
  const app = Consumer.create({
    queueUrl: queue_url,
    batchSize: batch_size,
    handleMessage
  });
  app.on('error', handleError);

  // start app
  app.start();

  // stop app
  setTimeout(() => {
    app.stop()
    callback(null)
  }, consumer_timeout);
};

function handleMessage(rawMessage, done) {
  const messsage = JSON.parse(rawMessage);
  const userId = meess
  loadEvents(messsage.user_id)
    .then(events => {
      const orderCreated = find(events, { type: event_type.order_created });
      const orderConfirmed = find(events, { type: event_type.order_confirmed });
      if (orderConfirmed) {
        return { done: true };
      }

      const numberOfConfirmations = size(filter(events, { type: event_type.order_transaction_confirmed }));
      if (numberOfConfirmations >= 3) {
        return confirmOrder(userId);
      }

      const orderTransactionBroadcasted = find(events, { type: event_type.order_transaction_broadcasted });
      if (!orderTransactionBroadcasted) {
        // resolve txid
        const paymentAddress = orderCreated.data.payment_address;
        return updateTxId(userId, paymentAddress);
      } else {
        const txId = orderTransactionBroadcasted.data.tx_id;
        // get number of confirmations
        return updateConfrimationsNumber(userId, txId, numberOfConfirmations);
      }
    })
    .then(result => {
      log.info({ result }, 'finished handling request');
      if (result.done) {
        done()
      } else {
        // hack: return an error, to keep the message in the queue
        done({ skip: true })
      }
    })
    .catch(error => {
      done(error)
      log.error({ error }, 'failed to handle request');
    });
}

export function handleError(err) {
  if (err.skip) {
    return;
  }
  log.error({ err }, 'error occured during queue processing');
}

export function confirmOrder(userId) {
  const payload = {
    user_id: userId,
    event_id: createOrderedId(),
    type: event_type.order_confirmed,
    timestamp: new Date().toISOString()
  };
  return saveEvent(payload);
}

export function updateTxId(userId) {
  return fetch(`${insight_api}/addr/${payment_address}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(result => {
      if (response.status === httpStatus.OK) {
        return response.json();
      } else {
        log.error({ result }, 'failed to get addr');
      }
    })
    .then(data => {
      if (data && !isEmpty(data.transactions)) {
        const txId = first(data.transactions);
        const payload = {
          user_id: userId,
          event_id: createOrderedId(),
          type: event_type.order_transaction_broadcasted,
          timestamp: new Date().toISOString(),
          data: {
            tx_id: txId
          }
        };
        return saveEvent(payload)
      }
    });
}

export function updateConfrimationsNumber(userId, txId, numberOfConfirmations) {
  return fetch(`${insight_api}/tx/${txId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(result => {
      if (response.status === httpStatus.OK) {
        return response.json();
      } else {
        log.error({ result }, 'failed to get tx');
      }
    })
    .then(data => {
      if (data && data.confirmations) {
        if (data.confirmations > numberOfConfirmations) {
          const payload = {
            user_id: userId,
            event_id: createOrderedId(),
            type: event_type.order_transaction_confirmed,
            timestamp: new Date().toISOString(),
          };
          return saveEvent(payload)
        }
      }
    });
}
