from flask import Flask
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Josue Guajardo",
        "about" :"this is just an example to reference"
    }

    return response_body