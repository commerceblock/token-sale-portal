// local imports
import Address from '../model/address';
import { columns } from '../model/consts';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'addresses-store' });

export function saveAddress(payload) {
  return new Promise((resolve, reject) => {
    try {
      const address = new Address(payload);
      address.save((error) => {
        if (error) {
          log.error({ error, payload }, 'failed to save address');
          reject({ error, payload });
        } else {
          log.info(`address saved, id: ${payload.address} -> ${payload.user_id}`);
          resolve(payload);
        }
      });
    } catch (error) {
      log.error({ error, payload }, 'an error occurred while saving address');
      reject({ error, payload });
    }
  });
}

export function loadAddress(address) {
  return new Promise((resolve, reject) => {
    InviteCode.get({ address }, (error, item) => {
      if (error) {
        log.error({ address, error }, 'failed to load address');
        reject({ address, error });
      } else {
        resolve(item);
      }
    });
  });
}
