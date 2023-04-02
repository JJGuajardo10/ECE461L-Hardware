import os

from flask import Flask
from config import Config
from flask_cors import CORS  # comment this on deployment
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager


db = MongoEngine() # db initialization occurs before the app starts

app = Flask(__name__)
app.config.from_object(Config)

app.config['MONGODB_SETTINGS' ]= {
    "db": "hardware",
    "host": "localhost",
    "port": 5000
}
db.init_app(app)

# hw1 = Hardware(name="Set1", capacity=512)

jwt = JWTManager(app)

CORS(app)

from .routes import *
from .models import init_hardware, init_godmin

init_hardware()
