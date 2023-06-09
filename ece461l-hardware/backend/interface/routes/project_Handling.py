from flask import Blueprint, request, jsonify
from database import Projects, HardwareSet
from flask_jwt_extended import get_jwt_identity, jwt_required
from mongoengine import ValidationError, NotUniqueError
from interface.routes.hardware_Handling import parse_error
import json
from datetime import datetime

projects = Blueprint('projects', __name__)


@projects.route('/', methods=['POST'])
@jwt_required()
def projects_create():
    req = request.get_json()
    req["creator_id"] = get_jwt_identity()["_id"]["$oid"]
    try:
        new_project = Projects(**req).save()
        return new_project.to_json(), 201
    except ValidationError as e:
        return parse_error(e), 422
    except NotUniqueError as e:
        return {'msg': str(e)}, 422


@projects.route('/', methods=['GET'])
@jwt_required()
def projects_read():
    for project in Projects.objects(creator_id=get_jwt_identity()["_id"]["$oid"]):
        project_hardware = list()
        for hardware in project.hardware:
            price = HardwareSet.objects(id=hardware["_id"]).first()["price"]
            old_datetime = hardware["checkout_time"]
            # price * time diff in hours
            hardware["cost"] = price * \
                ((datetime.now() - old_datetime).seconds / 3600)
            project_hardware.append(hardware)
        project.update(hardware=project_hardware)
        project.reload()
    return Projects.objects(creator_id=get_jwt_identity()["_id"]["$oid"]).to_json(), 200


@projects.route('/<id>', methods=['GET'])
@jwt_required()
def projects_read_id(id):
    try:
        curr_project = Projects.objects(project_id=id).first()
        if curr_project:
            return curr_project.to_json(), 200
        else:
            return {'msg': 'Project not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422


@projects.route('/<id>', methods=['PUT'])
@jwt_required()
def update_project(id):
    req = request.get_json()
    try:
        curr_project = Projects.objects(id=id).first()
        if curr_project:
            curr_project.update(**req)
            curr_project.reload()
            return curr_project.to_json(), 200
        else:
            return {'msg': 'Project not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422


@projects.route('/<id>', methods=['DELETE'])
@jwt_required()
def remove_project(id):
    try:
        if Projects.objects(id=id).delete() > 0:
            return {'msg': 'Projects set successfully deleted'}, 200
        else:
            return {'msg': 'Project not found'}, 404
    except ValidationError as e:
        return parse_error(e), 422