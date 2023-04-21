from ast import AsyncFunctionDef
import wfdb
import numpy as np
from pymongo import MongoClient

test = False


class Metadata:
    def __init__(self, name='', desc='', num=0, unit=''):
        # 4 metadata values
        self.metadata = {'Database': name,
                         'Description': desc,
                         'Availability': num,
                         'Capacity': unit
                         }

    def getMetadata(self):
        return self.metadata

    def setDownload(self, link):
        self.metadata.update({'Link': link})


# class Record:
class HardwareSet:
    def __init__(self):
        self.client = MongoClient("mongodb+srv://farazrahman:JR64hbaPSXTLxl2V@cluster0.ss0ppqn.mongodb.net/?retryWrites=true&w=majority")
        self.db = np.array(wfdb.io.get_dbs())
        self.__db = self.client.Project461L
        if(test):
            print("Init", np.shape(self.db))

    def getHWSetDBList(self):
        # Returns a list of all database names
        dataset = self.db[:, 0]
        if (test):
            print(len(dataset))
            # print(dataset)
        return dataset

    def getRecordList(self, db):
        # Gets a list of all the records in database
        rec = wfdb.io.get_record_list(db, records='all')
        if (test):
            print(db, rec)
        return rec