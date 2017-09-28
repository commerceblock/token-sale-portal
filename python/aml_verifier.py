from aml_table import Aml
import httplib
import urllib
import json


with open('config.json') as json_data_file:
  config = json.load(json_data_file)['verify']

class aml_api_handler(object):
  url = config['host']
  path = config['path']
  conn = None

  def __init__(self):
    self.conn = httplib.HTTPConnection(self.url)


  def verify(self,address):
    params = urllib.urlencode({'address': address})
    self.conn.request("GET",self.path, params)
    response = self.conn.getresponse()
    print "aadress : " , address, response.status, response.reason
    return response

    def __del__(self):
      self.conn.close()

def main():
  verify_address("aaaaaaaa")

def verify_address(address):
  try:
    print "verifiying address : ", str(address)
    aml_api = aml_api_handler()
    response =   aml_api.verify(address)
    data = str(response.read())
    data_json = json.loads(data)
    event_type = 'failed_verification'
    if response.status == 200:
      recommenation = data_json['recommendation']
      if recommenation <=1:
        event_type = "verified"
      else:
        event_type = "rejected"
    # data = "test"
    # event_type = "rejected"
    # aml_table = Aml()
    aml_table.insert_to_aml(address,event_type,data)
    print "done verifieng address : ",address

  except Exception as e:
    print e.__doc__
    print e.message
    print e
    print "verify address : ",address , "failed "
    return "FAILURE"
  else:
    print "verify address : ",address , "success"
    return "SUCCESS"

if __name__ == '__main__':
  out = main()
