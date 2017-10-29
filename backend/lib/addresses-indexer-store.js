// local imports
import AddressIndex from '../model/address-index';
import { columns } from '../model/consts';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'addresses-indexer-store' });

export function saveAddressIndex(payload) {
  return new Promise((resolve, reject) => {
    try {
      const address = new AddressIndex(payload);
      address.save((error) => {
        if (error) {
          log.error({ error, payload }, 'failed to save address');
          reject({ error, payload });
        } else {
          log.info(`address saved, id: ${payload.address} -> ${payload.timestamp}`);
          resolve(payload);
        }
      });
    } catch (error) {
      log.error({ error, payload }, 'an error occurred while saving address');
      reject({ error, payload });
    }
  });
}

export function loadAddressIndex(address) {
  return new Promise((resolve, reject) => {
    AddressIndex.get({ address }, (error, item) => {
      if (error) {
        log.error({ address, error }, 'failed to load address');
        reject({ address, error });
      } else {
        resolve(item);
      }
    });
  });
}
