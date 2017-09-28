import aml_scanner
import time_uuid
from aml_table import Aml
import time
from concurrent.futures import ThreadPoolExecutor
import concurrent.futures

executor = ThreadPoolExecutor(max_workers=20)

def main():
  # create_adresses()
  # aml_scanner.main()
  # create_adresses()
  # create_adresses()
  # aml_scanner.main()
  # create_adresses()
  # aml_scanner.main()
  # create_adresses()
  # aml_scanner.main()
  # create_adresses()
  aml_scanner.main()
  # time.sleep(30)
  # aml_scanner.main()

def create_adresses():
  aml = Aml()
  results = []
  for x in range(0, 100):
    results.append(executor.submit(generate_address))
  for future in concurrent.futures.as_completed(results):
    result = future.result()
    if (result == "OK"):
      print "OK"
    else:
      print "FAIL"

def generate_address():
  aml = Aml()
  address = str(time_uuid.TimeUUID.with_timestamp(time_uuid.utctime()))
  aml.insert_new_to_aml(address)
  return "OK"

if __name__ == '__main__':
  out = main()
