
// imports
import Sequelize from 'sequelize';

// local imports
import sequelize from '../lib/sequelize';
import { columns } from './consts';

const PaymentId = sequelize.define('payment_id', {
  [columns.payment_id]: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  [columns.user_id]: {
    type: Sequelize.STRING,
  },
  [columns.timestamp]: Sequelize.STRING,
}, {
  timestamps: false,
});

export default PaymentId;
