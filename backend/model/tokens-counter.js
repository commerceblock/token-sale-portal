// imports
import { Schema } from 'dynamoose';
import dynamoose from '../lib/dynamoose';

// local imports
import { columns } from './consts';

// schema defintion
const TokensCounterSchema = new Schema({
  [columns.name]: {
    type: String,
    hashKey: true,
  },
  [columns.total]: {
    type: Number,
  },
});

const TokensCounter = dynamoose.model('tokens-counter', TokensCounterSchema);
export default TokensCounter;
