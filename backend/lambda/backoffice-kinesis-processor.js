
// imports
import AWS from 'aws-sdk'
import { map, isEmpty, filter } from 'lodash'

// local imports
import { parseEvent } from '../lib/http-util'
import { stream_name } from '../model/consts'

// logging
import { createLogger } from 'bunyan'

const log = createLogger({ name: 'backoffice-kinesis-processor' });

const kinesis = new AWS.Kinesis();

export function process(event, context, callback) {
  log.info(event, 'Received event');

  // parse event
  const events = parseEvent(event);
  const records = map(events, e => ({
    Data: JSON.stringify(e),
    PartitionKey: e.address,
  }));

  if (isEmpty(records)) {
    log.info('empty batch');
    return callback();
  } else {
    log.info(`pushing ${records.length}`)
    const putRequest = buildPutRequest(records)
    kinesis
      .putRecords(putRequest)
      .promise()
      .then(result => handleSuccess(result, callback))
      .catch(error => handleError(error, callback));
  }
}

function handleSuccess(result, callback) {
  if (result.FailedRecordCount === 0) {
    log.info('all records pushed successfully');
  } else {
    log.warn(`failed to push ${result.FailedRecordCount} records`);
    const failed_records = filter(result.Records, r => !isEmpty(r.ErrorCode));
    log.error({ failed_records }, 'error occurred while pushing records');
  }
  callback();
}

function handleError(error, callback) {
  log.error({ error }, 'failed to put records, abort batch');
  callback('abort batch');
}

function buildPutRequest(records) {
  return {
    Records: records,
    StreamName: stream_name,
  };
}
