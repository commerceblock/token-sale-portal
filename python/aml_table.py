from mysql_db import MySqlDB
import time_uuid

class Aml(object):

    db = None

    def __init__(self):
      self.db = MySqlDB()

    def insert_to_aml_no_data(self,address,event_type):
      self.insert_to_aml(address,event_type,None)

    def insert_to_aml(self,address,event_type,data):
      uuid = str(time_uuid.TimeUUID.with_timestamp(time_uuid.utctime()))
      if(data is not None):
        prepstmt = "INSERT INTO aml (address ,event_id, event_type,data) VALUES (%s, %s, %s, %s)"
        self.db.prep_stmt_query(prepstmt, (address,uuid,event_type,data))
        self.db.commit()
      else:
        prepstmt = "INSERT INTO aml (address ,event_id, event_type) VALUES (%s, %s, %s)"
        self.db.prep_stmt_query(prepstmt, (address,uuid,event_type))
        self.db.commit()

    def insert_new_to_aml(self,address):
      self.insert_to_aml(address,"created",None)

    def get_relevant_events(self):
      stmt="select address , event_type , data from aml where address not in(select address from aml where event_type = 'synced')"
      cursor = self.db.get_cursor(stmt)
      return cursor.fetchall()

    def get_events(self,event_type):
      stmt="select address , event_type , data from aml where address not in(select address from aml where event_type = " + event_type + ")"
      cursor = self.db.get_cursor(stmt)
      return cursor.fetchall()
