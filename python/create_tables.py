import sys
from mysql_db import MySqlDB


db = None

def create_aml():
    stmt_create = (
      "CREATE TABLE aml ("
      "address VARCHAR(50) NOT NULL, "
      "event_id VARCHAR(50) NOT NULL, "
      "timestamp TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), "
      "event_type ENUM('created', 'verified' , 'rejected', 'synced') NOT NULL, "
      "data TEXT , "
      "PRIMARY KEY (address,event_id))"
    )
    db.query(stmt_create)

def create_no_update_triggers():
      stmt_trigger_aml = (
          "CREATE TRIGGER stop_update_aml BEFORE UPDATE ON aml "
          "FOR EACH ROW "
          "SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Update not allowed!'"
      )
      db.query(stmt_trigger_aml)


def creat_all():
    create_aml()
    create_no_update_triggers()

def main(argv):
  if(len(argv) > 1 and argv[1] is not None):
      globals()[argv[1]]()
  else:
    creat_all()

if __name__ == '__main__':
  db = MySqlDB()
  main(sys.argv)
