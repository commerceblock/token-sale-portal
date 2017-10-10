
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

export function btcAPI(coin) {
  return coin === 'BTC' ? 'https://api.smartbit.com.au' : 'https://testnet-api.smartbit.com.au';
}

export function btcUrl(coin) {
  return coin === 'BTC' ? 'https://www.smartbit.com.au' : 'https://testnet.smartbit.com.au';
}

export default {
  initBaseUrl,
  login,
  gql,
}
