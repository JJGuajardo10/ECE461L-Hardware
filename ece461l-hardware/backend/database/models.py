from flask_mongoengine import MongoEngine

import pymongo

db = MongoEngine()


class User(db.Document):

    first_name = db.StringField(required=True)
    last_name = db.StringField(required=True)
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True)

class Projects(db.Document):

    name = db.StringField(required=True, min_length=1, max_length=20)
    description = db.StringField(required=True, min_length=5)
    hardware = db.ListField(db.DictField())
    creator_id = db.ObjectIdField(required=True)
    project_id = db.StringField(required=True, unique=True)


class HardwareSet(db.Document):
    
    name = db.StringField(required=True, unique=True, min_length=1)
    capacity = db.IntField(required=True, min_value=0)
    available = db.IntField(required=True, min_value=0)
from models import User, Projects, HardwareSet, db

all = ["db", "User", "Projects", "HardwareSet"]
