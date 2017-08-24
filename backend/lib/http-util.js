

// imports
import httpStatus from 'http-status-codes';
import { map, filter } from 'lodash';

// local imports
import { columns } from '../model/consts';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'http-util' });

const DEFAULT_CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export function toResponse (status, body) {
  var body = body || {};
  return {
    statusCode: status,
    headers: DEFAULT_CORS_HEADERS,
    body: JSON.stringify(body),
  };
};

export function toRedirectResponse(url) {
  const headers = Object.assign({
    Location: url,
  }, DEFAULT_CORS_HEADERS);
  return {
    statusCode: httpStatus.MOVED_TEMPORARILY,
    headers,
  };
};

export function parseEvent(event) {
  const records = event.Records ? event.Records : [];
  const events = map(records, record => {
    try {
      const newImage = record.dynamodb.NewImage,
        user_id = newImage[columns.user_id].S,
        event_id = newImage[columns.event_id].S,
        type = newImage[columns.type].S,
        timestamp = newImage[columns.timestamp].S,
        data = newImage[columns.data].S ? JSON.parse(newImage[columns.data].S) : {};
      return {
        user_id,
        event_id,
        type,
        timestamp,
        data,
      };
    } catch (err) {
      log.error({
        record,
        err,
      }, 'Failed to prase record');
      return {};
    }
  });
  return filter(events, eventUtil.isEventPredicate);
};

export function executePromises(promise, request_logger, callback) {
  return promise
  .then(results => {
    const msg = `Finished processing ${results.length} events`;
    request_logger.info(msg);
    // TODO: revisit flow, we might need further processing...
    callback(null, {
      result: {
        message: msg,
      },
    });
  })
  .catch(error => {
    request_logger.error({
      error,
    }, 'Failed to process events');
    // TODO: revisit flow, we might need further processing...
    callback(null, {
      error: {
        message: 'Failed to process events',
        error,
      },
    });
  });
}
