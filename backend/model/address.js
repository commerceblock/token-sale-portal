
// imports
import { Schema } from 'dynamoose'
import dynamoose from '../lib/dynamoose'

// local imports
import { columns } from './consts'

// schema defintion
const AddressSchema = new Schema({
  [columns.address]: {
    type: String,
    hashKey: true,
  },
  [columns.user_id]: {
    type: String,
  },
  [columns.status]: {
    type: String,
  },
  [columns.event_id]: {
    type: String,
  },
  [columns.type]: {
    type: String,
  },
  [columns.timestamp]: {
    type: String,
  },
  [columns.data]: {
    type: Object,
  },
});

const Address = dynamoose.model('addresses', AddressSchema);
export default Address;
