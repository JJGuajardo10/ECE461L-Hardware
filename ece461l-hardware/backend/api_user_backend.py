from flask import Flask
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

@api.route('/checkIn/')
def checkIn_hardware():
    response_body={
        'projectID': 'P1',
        'qty': '100'
    }
    return response_body

@api.route('/checkOut/')
def checkOut_hardware():
    response_body= {
        'projectID': 'p2',
        'qty': '10'
    }
    return response_body

@api.route('/joinProj/')
def joinProject():
    response_body={
        'projectID': 'p3',
    }
    return response_body

@api.route('/leaveProj/')
def leaveProject():
    response_body={
        'projectID': 'p4',
    }
    return response_body