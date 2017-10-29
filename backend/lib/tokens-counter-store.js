// local imports
import TokensCounter from '../model/tokens-counter';
import { columns } from '../model/consts';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'tokens-counter-store' });

export function loadCounter() {
  return new Promise((resolve, reject) => {
    TokensCounter.get({ name: 'all' }, (error, item) => {
      if (error) {
        log.error({ error }, 'failed to load counter');
        reject({ error });
      } else {
        resolve(item.total);
      }
    });
  });
};
