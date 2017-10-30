// imports
import { isEmpty, conforms, isString } from 'lodash';
import { createHmac } from 'crypto';

// local imports
import {
  hex_encoding,
  sha256_hash,
  base64_encoding,
} from '../model/consts';


export const isEventPredicate = conforms({
  type: isString,
});

export function isValid(param) {
  return isString(param) && !isEmpty(param) && param.length <= 300;
}

export function isNotValid(param) {
  return !isValid(param);
}

// Event FQN: event fully qualified name
export function formatEventFQN(event) {
  return `${event.user_id}/${event.type}/${event.event_id}`;
}

export function uuidToBase64(uuidStr) {
  const stripped = uuidStr.replace(/-/g, '');
  return new Buffer(stripped).toString(base64_encoding);
}

export function computeSignature(user_id, message) {
  const secret = `__${user_id}__`;
  return createHmac(sha256_hash, secret)
    .update(message)
    .digest(hex_encoding);
}
