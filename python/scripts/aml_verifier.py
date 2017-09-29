import httplib
import json
import urllib

from python.db.aml_table import Aml

with open('./properties/config.json') as json_data_file:
  config = json.load(json_data_file)['verify']

class aml_api_handler(object):
  url = config['test_host']
  login_path = config['login_path']
  email = config['email']
  password = config['password']
  verify_path = config['verify_path']
  token = config['token']
  conn = None

  def __init__(self):
    self.conn = httplib.HTTPSConnection(self.url)


  def verify(self,address):
    params = urllib.urlencode({'address': address})
    headers = {"Content-type": "application/json", "Authorization" : str(self.token)}
    self.conn.request("GET",self.verify_path, params,headers)
    response = self.conn.getresponse()
    print "aadress : " , address, response.status, response.reason
    return response

  def login(self):
    headers = {"Content-type": "application/json"}
    body = json.dumps({"email" : self.email ,
            "password" : self.password
            })
    self.conn.request("POST",self.login_path, body,headers)
    response = self.conn.getresponse()
    print "log in request fro email : ", self.email, response.status, response.reason
    return response

  def get_token(self):
    response =   self.login()
    data = str(response.read())
    data_json = json.loads(data)
    token = data_json['token']
    return token

  def __del__(self):
      self.conn.close()

def main():
  verify_address("aaaaaaaa")

def verify_address(address):
  try:
    print "verifiying address : ", str(address)
    aml_api = aml_api_handler()
    # response =   aml_api.verify(address)
    # data = str(response.read())
    # data_json = json.loads(data)
    # event_type = 'failed_verification'
    # if response.status == 200:
    #   recommenation = data_json['recommendation']
    #   if recommenation <=1:
    #     event_type = "verified"
    #   else:
    #     event_type = "rejected"
    data = "test"
    event_type = "rejected"
    aml_table = Aml()
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
