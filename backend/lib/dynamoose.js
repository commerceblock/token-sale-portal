
// imports
import dynamoose from 'dynamoose';

// local imports
import { env_name } from '../model/consts';


if (process.env.IS_OFFLINE) {
  // dev env
  // setup local dynamodb
  // seed dummy AWS settings
  dynamoose.AWS.config.update({
    accessKeyId: 'AKID',
    secretAccessKey: 'SECRET',
    region: 'test'
  });
  dynamoose.local();
}

// connection settings
dynamoose.AWS.config.update({
  httpOptions: {
    connectTimeout: 300,
  },
});

// retry strategy
dynamoose.AWS.config.update({
  maxRetries: 3,
  retryDelayOptions: {
    customBackoff: (count) => 50,
  },
});

// set default settings
dynamoose.setDefaults({
  create: false,
  update: false,
  waitForActive: false,
  waitForActiveTimeout: 1,
  prefix: `${env_name}-`,
  useDocumentTypes: true,
  useNativeBooleans: true,
});

export default dynamoose;
