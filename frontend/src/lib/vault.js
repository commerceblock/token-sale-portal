
// imports
import {
  isNumber,
  mapValues,
} from 'lodash';

const store = {
  accessToken: null,
  accessTokenExpiry: null
};

export function setAccessToken(accessToken, accessTokenTtl) {
  store.accessToken = accessToken;
  // TODO: export from server
  store.accessTokenExpiry =  new Date().getTime() + accessTokenTtl;
}

export function getAccessToken() {
  return store.accessToken;
}

export function isAccessTokenValid() {
  return isNumber(store.accessTokenExpiry) && store.accessTokenExpiry > new Date().getTime();
}

export function reset() {
  mapValues(store, (value, key) => { store[key] = null });
}
