#if init file needed, just grab base.py file and make it "__init__"
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from database.models import HardwareSet, Projects
from mongoengine import ValidationError, NotUniqueError

import json
from datetime import datetime

hardware = Blueprint('hardware', __name__)

def parse_error(e):
    errors = dict()
    if e.errors:
        for field in e.errors:
            errors[field] = e.errors[field]._message
    else:
        errors['msg'] = e._message
    return errors

@hardware.route('/', methods=['POST'])
@jwt_required()
def hardware_create():

    req = request.get_json()
    try:
        new_hardware_set = HardwareSet(**req).save()
        return new_hardware_set.to_json(), 201
    except ValidationError as e:
        return parse_error(e), 422
    except NotUniqueError as e:
        return { 'msg': str(e) }, 422


@hardware.route('/', methods=['GET'])
@jwt_required()
def hardware_read():
    return HardwareSet.objects.to_json(), 200

@hardware.route('/<id>', methods=['GET'])
@jwt_required()
def hardware_read_id(id):
    try:
        curr_project = Projects.objects(id=id).first()
        if curr_project:
            hardware_list = curr_project["hardware"]
            return json.dumps(hardware_list, default=str), 200
        else:
            return {'msg': 'Project not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422


@hardware.route('/<id>', methods=['PUT'])
@jwt_required()
def update_hardware(id):
    req = request.get_json()
    try:
        hardware_set = HardwareSet.objects(id=id).first()
        if hardware_set:
            hardware_set.update(**req)
            hardware_set.reload()
            return hardware_set.to_json(), 200
        else:
            return {'msg': 'Hardware set not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422


@hardware.route('/<id>', methods=['DELETE'])
@jwt_required()
def remove_hardware(id):
    try:
        if HardwareSet.objects(id=id).delete() > 0:
            return {'msg': 'Hardware set successfully removed'}, 200
        else:
            return {'msg': 'Hardware set not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422


@hardware.route('/check-out/<id>', methods=['POST'])
@jwt_required()
def checkOut_hardware(id):
    req = request.get_json()
    try:
        project = Projects.objects(id=req["project_id"]).first()
        if project:
            hardware_set = HardwareSet.objects(id=id).first()
            project_hardware = project.hardware
            found = False
            for hardware in project_hardware:
                if hardware["_id"] == id:
                    found = True
                    hardware["amount"] += req["amount"]
            if not found:
                project_hardware.append({
                    "_id": id,
                    "name": hardware_set["name"],
                    "amount": req["amount"],
                    "cost": 0,
                    "checkout_time": datetime.now()
                })
            # hardware_set.update(dec__available=req["amount"]) -- Can't use this while Mongoengine bug is there
            hardware_set.update(available=hardware_set.available-req["amount"])
            hardware_set.reload()
            project.update(hardware=project_hardware)
            project.reload()
            return hardware_set.to_json(), 200
        else:
            return {'msg': 'Project not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422


@hardware.route('/check-in/<id>', methods=['POST'])
@jwt_required()
def checkIn_hardware(id):
    req = request.get_json()
    try:
        project = Projects.objects(id=req["project_id"]).first()
        if project:
            hardware_set = HardwareSet.objects(id=id).first()
            project_hardware = project.hardware
            found = False
            remove = None
            for hardware in project_hardware:
                if hardware["_id"] == id:
                    found = True
                    hardware["amount"] -= req["amount"]
                    if hardware["amount"] == 0:
                        remove = hardware
            if not found or hardware_set == None:
                return {'msg': 'Hardware Set not found for this project'}, 404
            if remove is not None:
                project_hardware.remove(remove)
            hardware_set.update(inc__available=req["amount"])
            hardware_set.reload()
            project.update(hardware=project_hardware)
            project.reload()
            return hardware_set.to_json(), 200
        else:
            return {'msg': 'Project not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422