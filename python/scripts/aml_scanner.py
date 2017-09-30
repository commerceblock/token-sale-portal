import concurrent.futures
from concurrent.futures import ThreadPoolExecutor

import aml_syncer
import aml_verifier
from python.db.aml_table import Aml


class address_class(object):
    address = None
    operation = "verify"
    event_type = None
    event_id = None
    event_data = None

    def __init__(self,_address):
      self.address = _address

    def check_event(self,event_type,event_data,event_id):
      if(event_type == "verified" or event_type == "rejected"):
        if(self.operation == "verify"):
          self.operation = "sync"
          self.event_type = event_type
          self.event_data  = event_data
          self.event_id = event_id


executor = ThreadPoolExecutor(max_workers=10)


def main():
    print "started scanner"
    procced_result = {}
    sync_tasks = []
    verify_tasks = []
    aml = Aml()
    data = aml.get_relevant_events()
    for row in data:
      address = row[0]
      event_type = row[1]
      event_data = row[2]
      event_id = row[3]
      address_obj = procced_result.get(address)
      if(address_obj is None):
        address_obj = address_class(address)
      address_obj.check_event(event_type,event_data,event_id)
      procced_result[address] = address_obj
    for address_obj in procced_result.values():
      if(address_obj.operation == "sync"):
        sync_tasks.append(sync_address(address_obj))
      elif (address_obj.operation == "verify"):
        verify_tasks.append(verify_address(address_obj.address))

    proccess_result(sync_tasks,verify_tasks)

def proccess_result(sync_tasks,verify_tasks):
  sync_success = 0
  sync_failure = 0
  verify_success = 0
  verify_failure = 0
  for future in concurrent.futures.as_completed(sync_tasks):
    result = future.result()
    if (result == "SUCCESS"):
      sync_success += 1
    else:
      sync_failure += 1
  for future in concurrent.futures.as_completed(verify_tasks):
    result = future.result()
    if (result == "SUCCESS"):
      verify_success += 1
    else:
      verify_failure += 1
  print sync_success," sync tasks succeeded"
  print sync_failure," sync tasks failed"
  print verify_success," verify tasks succeeded"
  print verify_failure," verify tasks failed"

def sync_address(address_obj):
  print "syncing address : " , str(address_obj.address)
  future  = executor.submit(aml_syncer.sync_address, address_obj)
  return future

def verify_address(address):
  print "verifiying address : ", str(address)
  future = executor.submit(aml_verifier.verify_address, address)
  return future

if __name__ == '__main__':
  out = main()
