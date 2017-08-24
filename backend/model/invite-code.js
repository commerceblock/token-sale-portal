
// imports
import { Schema } from 'dynamoose'
import dynamoose from '../lib/dynamoose'

// local imports
import { columns } from './consts'

// schema defintion
const InviteCodeSchema = new Schema({
  [columns.invite_code]: {
    type: String,
    hashKey: true,
  },
  [columns.user_id]: {
    type: String,
  },
});

const InviteCode = dynamoose.model('invite-codes', InviteCodeSchema);
export default InviteCode;
