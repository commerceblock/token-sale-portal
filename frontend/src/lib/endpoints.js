
// local store
const store = {
  baseUrl: null,
}

export function initBaseUrl(baseUrl) {
  store.baseUrl = baseUrl;
}

export function login() {
  return `${store.baseUrl}/v1.0/login`
}

export function gql() {
  return `${store.baseUrl}/v1.0/graphql`
}

export default {
  initBaseUrl,
  login,
  gql,
}
