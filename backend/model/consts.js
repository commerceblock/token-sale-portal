// env variables
export const env_name = process.env.CB_ENV_NAME;

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
  invite_code: 'invite_code',
  access_token_id: 'access_token_id',
};

// event types
export const event_type = {
  account_created: 'account_created',
  invite_code_generated: 'invite_code_generated',
  order_created: 'order_created',
  order_payment_broadcasted: 'order_payment_broadcasted',
  order_payment_confirmed: 'order_payment_confirmed',
  order_confirmed: 'order_confirmed',
};
