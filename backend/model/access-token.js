
// imports
import { Schema } from 'dynamoose'
import dynamoose from '../lib/dynamoose'

// local imports
import { columns } from './consts'

// schema defintion
const AccessTokenSchema = new Schema({
  [columns.access_token_id]: {
    type: String,
    hashKey: true,
  },
  [columns.user_id]: {
    type: String,
  },
  [columns.timestamp]: {
    type: String,
  },
});

const AccessToken = dynamoose.model('access-tokens', AccessTokenSchema);
export default AccessToken;
