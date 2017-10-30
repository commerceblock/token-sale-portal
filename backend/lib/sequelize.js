// imports
import Sequelize from 'sequelize';

// consts
const database = process.env.CB_DB_NAME;
const username = process.env.CB_DB_USERNAME;
const password = process.env.CB_DB_PASSWORD;
const host = process.env.CB_DB_HOST;
const port = parseInt(process.env.CB_DB_PORT || '3306');

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'mysql',
  operatorsAliases: false
});

export default sequelize;
