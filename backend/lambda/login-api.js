// imports
import httpStatus from 'http-status-codes';

// local imports
import consts from '../model/consts';
import httpUtil from '../lib/http-util';
import { createOrderedId, createId } from '../lib/uuid';
import { isNotValid } from '../lib/item-util';
import { loadCode } from '../lib/invite-codes-store';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'login-api' });

export function post (event, context, callback) {
  const request_id = createOrderedId();
  log.info({
    request_id,
    event,
  }, 'start');
  const request = JSON.parse(event.body) || {},
    invite_code = request[consts.columns.invite_code];
  if (isNotValid(invite_code)) {
    const response = httpUtil.toResponse(httpStatus.BAD_REQUEST);
    log.warn({
      request_id,
      response,
    }, 'Failed to parse request params - end');
    return callback(null, response);
  }
  loadCode(invite_code)
    .then(item => {
      if (item) {
        // TODO: generate and save token
      } else {
        const response = httpUtil.toResponse(httpStatus.NOT_FOUND);
        log.warn({
          request_id,
          response,
        }, 'Failed to locate invite code - end');
        return callback(null, response);
      }
    })
    .then(result => {
      if (result) {
        // TODO:: complete
        const body = {};
        const response = httpUtil.toResponse(httpStatus.CREATED, body);
        log.info({
          request_id,
          http_response: response,
        }, 'success - end');
        return callback(null, response);
      } else {
        const response = httpUtil.toResponse(httpStatus.INTERNAL_SERVER_ERROR);
        log.error({
          request_id,
          result,
          http_response: response,
        }, 'Failed to process request - end');
        return callback(null, response);
      }
    })
    .catch(error => {
      const response = httpUtil.toResponse(httpStatus.INTERNAL_SERVER_ERROR);
      log.error({
        request_id,
        error,
        http_response: response,
      }, 'Failed to process request - end');
      return callback(null, response);
    });
};
