// local store
const store = {
  baseUrl: null,
}

export function initBaseUrl(baseUrl) {
  store.baseUrl = baseUrl;
}

export function login() {
  return `${store.baseUrl}/v1.0/login`;
}

export function gql() {
  return `${store.baseUrl}/v1.0/graphql`;
}

export function invoicesGQL() {
  return `${store.baseUrl}/v1.0/invoices/graphql`;
}

export function btcAPI(coin) {
  return coin === 'BTC' ? 'https://api.smartbit.com.au' : 'https://testnet-api.smartbit.com.au';
}

export function btcUrl(coin) {
  return coin === 'BTC' ? 'https://www.blockchain.info' : 'https://testnet.smartbit.com.au';
}

export function ethAPI(coin) {
  const apiUrl = coin === 'ETH' ? 'https://api.etherscan.io' : 'https://rinkeby.etherscan.io';
  return `${apiUrl}/api?module=account&action=txlist&sort=asc&apikey=TIDTGTD157H33IKTR3FY1HQNNYJ1PBKPKM`;
}

export function ethUrl(coin) {
  return coin === 'ETH' ? 'https://etherscan.io' : 'https://rinkeby.etherscan.io';
}

export default {
  initBaseUrl,
  login,
  gql,
}
