from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

api = Flask(__name__)
CORS(api)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Josue Guajardo",
        "about" :"this is just an example to reference"
    }

    return response_body


@api.route('/signUp/', methods=['POST'])
@cross_origin(origin='http://localhost:3000/')
def my_signup():
    response = request.json
    print(response)
    print('this is the backend')
    return jsonify({'success': True})