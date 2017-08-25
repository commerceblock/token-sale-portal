
const store = {
  accessToken: null
};

export function setAccessToken(accessToken) {
  store.accessToken = accessToken;
}

export function getAccessToken() {
  return store.accessToken;
}

export function reset() {
  store.accessToken = null;
}
