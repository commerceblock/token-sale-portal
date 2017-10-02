
// imports
import uuid from 'uuid';


export function createId() {
  // random uuid
  return uuid.v4();
}

export function createOrderedId() {
  // time ordered uuid
  return uuid.v1();
}
