// local imports
import InviteCode from '../model/invite-code';
import { columns } from '../model/consts';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'invite-code-store' });

export function saveCode(payload) {
  return new Promise((resolve, reject) => {
    try {
      const inviteCode = new InviteCode(payload);
      inviteCode.save((error) => {
        if (error) {
          log.error({ error, payload }, 'failed to save invite code');
          reject({ error, payload });
        } else {
          log.info(`invite code saved, id: ${payload.invite_code} -> ${payload.user_id}`);
          resolve(payload);
        }
      });
    } catch (error) {
      log.error({ error, payload }, 'an error occurred while saving invite code');
      reject({ error, payload });
    }
  });
}

export function loadCode(invite_code) {
  return new Promise((resolve, reject) => {
    InviteCode.get({ invite_code }, (error, item) => {
      if (error) {
        log.error({ invite_code, error }, 'failed to load invite code');
        reject({ invite_code, error });
      } else {
        resolve(item);
      }
    });
  });
}
