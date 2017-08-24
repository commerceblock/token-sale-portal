/* @flow */

const envVariable = process.env.MOCKED_DATABASE || 'false';
const useMockedDatabase = `${envVariable}`.toLowerCase() === 'true';

// eslint-disable-next-line global-require
const db = useMockedDatabase ? require('./mocked-database').default : require('./database').default;

export default {
  ...db,
};
