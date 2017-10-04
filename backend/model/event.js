
// imports
import { Schema } from 'dynamoose'

// local imports
import dynamoose from '../lib/dynamoose'
import { columns } from './consts'

// schema defintion
const EventSchema = new Schema({
  [columns.user_id]: {
    type: String,
    hashKey: true,
  },
  [columns.event_id]: {
    type: String,
    rangeKey: true,
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

const Event = dynamoose.model('events', EventSchema);
export default Event;
