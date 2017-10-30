// env variables
export const env_name = process.env.CB_ENV_NAME;
export const master_pub_key = process.env.MASTER_PUB_KEY;
export const ether_multisig = process.env.ETHER_MULTISIG;

export const stream_name = env_name + '-events';

// generic consts
export const utf_8_encoding = 'utf-8';
export const base64_encoding = 'base64';
export const hex_encoding = 'hex';
export const sha1_hash = 'sha1';
export const sha256_hash = 'sha256';
export const default_encoding = utf_8_encoding;

// item columns
export const columns = {
  // general
  event_id: 'event_id',
  type: 'type',
  timestamp: 'timestamp',
  data: 'data',

  // token sale platfrom
  user_id: 'user_id',
  address: 'address',
  access_token_id: 'access_token_id',
  order_id: 'order_id',
  created_by: 'created_by',
  ethereum_return_address: 'ethereum_return_address',
  ethereum_wallet_name: 'ethereum_wallet_name',
  amount: 'amount',
  coin: 'coin',
  payment_address: 'payment_address',
  status: 'status',
  whitelist: 'whitelist',
  kyc: 'kyc',
  bonus: 'bonus',
  spot_price: 'spot_price',
  name: 'name',
  total: 'total',
  invoice_id: 'invoice_id',
  payment_id: 'payment_id',
};

// event types
export const event_type = {
  account_created: 'account_created',
  order_created: 'order_created',
  order_transaction_broadcasted: 'order_transaction_broadcasted',
  order_transaction_confirmed: 'order_transaction_confirmed',
  order_confirmed: 'order_confirmed',
  terms_acknowledged: 'terms_acknowledged',
  return_address_created: 'return_address_created',
  account_kyc_created: 'account_kyc_created',
};

// order status
export const order_status = {
  initial: 'initial',
  unconfirmed: 'unconfirmed',
  confirmed: 'confirmed',
  fulfilled: 'fulfilled',
};

export const stage_type = {
  initial: 'initial',
  terms_acknowledged: 'terms_acknowledged',
  return_address_created: 'return_address_created',
  order_created: 'order_created'
}
