import boto3
import json
import time_uuid

from python.db.aml_table import Aml

def sync_address(address_obj):
  try:
    aml = Aml()
    with open('./properties/config.json') as json_data_file:
      config = json.load(json_data_file)['dynamodb']

    url = "http://" + config['host'] + ":" + str(config['port'])
    session = boto3.session.Session()
    ddb = session.resource('dynamodb', endpoint_url=url)
    table = ddb.Table(config['table_name'])

    #data = table.scan()
    event_type = "address_" + address_obj.event_type
    status = "passed"
    if (address_obj.event_type == "rejected"):
      status = "rejected"

    data = {"status" : status}
    table.put_item(
      Item={
        'user_id': address_obj.address,
        'event_id': address_obj.event_id,
        'type': event_type,
        'data': data,
        'timestamp': str(time_uuid.utctime()),
      }
    )

    # table.put_item(
    #   Item={
    #     'address': address_obj.address,
    #     'event_id': address_obj.event_id,
    #     'type': event_type,
    #     'data': data,
    #     'timestamp': str(time_uuid.utctime()),
    #   }
    # )
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


