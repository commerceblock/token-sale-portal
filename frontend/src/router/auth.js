
// local imports
import { isAccessTokenValid } from '../lib/vault';

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/login'
    });
  } else {
    next();
  }
}

export function isLoggedIn() {
  return isAccessTokenValid();
}
