
// imports
import uuid from 'uuid';

// local imports
import { uuidToBase64 } from './item-util';

export function createId() {
  // random uuid
  const id = uuid.v4();
  return uuidToBase64(id);
}

export function createOrderedId() {
  // time ordered uuid
  const orderedId = uuid.v1();
  return uuidToBase64(orderedId);
}
