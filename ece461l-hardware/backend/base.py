from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from pymongo import MongoClient

api = Flask(__name__)
CORS(api)
client = MongoClient('mongodb+srv://shakthip2021:LeoSeenivasan2025>@shakthimongoclustertest.patsgbz.mongodb.net/?retryWrites=true&w=majority')


@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Josue Guajardo",
        "about" :"this is just an example to reference"
    }

    return response_body


@api.route('/signUp/', methods=['POST'], endpoint='signUpEndpoint')
@cross_origin(origin='http://localhost:3000/')
def my_signup():
    response = request.json
    print(response)
    print('backend: recieved signup request')
    return jsonify({'success': True})



@api.route('/login/', methods=['POST'], endpoint='loginEndpoint')
def my_signup():
    response = request.json
    print(response)
    print('backend: recieved login request')
    return jsonify({'success': True})