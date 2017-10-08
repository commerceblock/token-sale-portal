
// imports
import Sequelize from 'sequelize';

// local imports
import sequelize from '../lib/sequelize';
import { columns } from './consts';

const Event = sequelize.define('token_sale_events', {
  [columns.user_id]: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  [columns.event_id]: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  [columns.type]: Sequelize.STRING,
  [columns.timestamp]: Sequelize.STRING,
  [columns.data]: Sequelize.STRING,
}, {
  timestamps: false,
});

export default Event;
