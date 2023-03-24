from flask import Flask

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Josue Guajardo",
        "about" :"this is just an example to reference"
    }

    return response_body