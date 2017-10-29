// imports
import { Schema } from 'dynamoose';
import dynamoose from '../lib/dynamoose';

// local imports
import { columns } from './consts';

// schema defintion
const AddressIndexSchema = new Schema({
  [columns.address]: {
    type: String,
    hashKey: true,
  },
  [columns.whitelist]: {
    type: Boolean,
  },
  [columns.kyc]: {
    type: Boolean,
  },
  [columns.bonus]: {
    type: Boolean,
  },
  [columns.spot_price]: {
    type: Number,
  },
  [columns.timestamp]: {
    type: String,
  },
});

const AddressIndex = dynamoose.model('addresses-index', AddressIndexSchema);
export default AddressIndex;
