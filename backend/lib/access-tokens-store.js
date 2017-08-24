// local imports
import AccessToken from '../model/access-token';
import { columns } from '../model/consts';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'access-token-store' });

export function saveToken(payload) {
  return new Promise((resolve, reject) => {
    try {
      const accessToken = new AccessToken(payload);
      accessToken.save((error) => {
        if (error) {
          log.error({ error, payload }, 'failed to save access token');
          reject({ error, payload });
        } else {
          log.info(`access token saved, id: ${payload.access_token_id} -> ${payload.user_id}`);
          resolve(payload);
        }
      });
    } catch (error) {
      log.error({ error, payload }, 'an error occurred while saving access token');
      reject({ error, payload });
    }
  });
}

export function loadCode(access_token_id) {
  return new Promise((resolve, reject) => {
    InviteCode.get({ access_token_id }, (error, item) => {
      if (error) {
        log.error({ access_token_id, error }, 'failed to load access token');
        reject({ access_token_id, error });
      } else {
        resolve(item);
      }
    });
  });
}
