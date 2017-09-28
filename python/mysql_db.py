
import mysql.connector
from mysql.connector.cursor import MySQLCursorPrepared
import json

with open('config.json') as json_data_file:
    config = json.load(json_data_file)

class MySqlDB(object):
  connection = None
  cursor = None
  cursor_prepared = None

  def __init__(self):
    self.connection = mysql.connector.Connect(**config['mysql'])
    self.cursor_prepared = self.connection.cursor(cursor_class=MySQLCursorPrepared)
    self.cursor = self.connection.cursor()

  def query(self, query):
    return self.cursor.execute(query)

  def get_cursor(self, query):
    self.cursor.execute(query)
    return self.cursor

  def prep_stmt_query(self, query, params):
    return self.cursor_prepared.execute(query, params)

  def commit(self):
    self.connection.commit();

  def __del__(self):
    if self.connection:
      self.connection.close()
