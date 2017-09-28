import boto3
import json
import time_uuid
from aml_table import Aml

def sync_address(address_obj):
  try:
    aml = Aml()
    with open('config.json') as json_data_file:
      config = json.load(json_data_file)['dynamodb']

    url = "http://" + config['host'] + ":" + str(config['port'])
    session = boto3.session.Session()
    ddb = session.resource('dynamodb', endpoint_url=url)
    table = ddb.Table(config['table_name'])

    data = table.scan()
    table.put_item(
      Item={
        'user_id': address_obj.address,
        'event_id': address_obj.address,
        'type': address_obj.event_type,
        'data': address_obj.event_data,
        'timestamp': str(time_uuid.utctime()),
      }
    )

    aml.insert_to_aml_no_data(address_obj.address,"synced")
  except Exception as e:
    print e.__doc__
    print e.message
    print e
    print "sync address : ",address_obj.address , "failed"
    return "FAILURE"
  else:
    print "sync address : ",address_obj.address , "success"
    return "SUCCESS"


