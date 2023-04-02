from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from interface import bcrypt
from database import User
from interface.routes.input_validation import valid_login, valid_registration

users = Blueprint('users', __name__)


@users.route('/login', methods=['POST'])
def login():
    req = request.get_json()
    is_valid, errors = valid_login(req)
    if not is_valid:
        return errors, 404

    user = User.objects(email=req['email']).first()
    if not user:
        return {
            'email': 'No account with this email exists.',
            'password': ''
        }, 404
    if not bcrypt.check_password_hash(user.password, req['password']):
        return {
            'email': '',
            'password': 'Password is incorrect.'
        }, 401

    access_token = create_access_token(identity=user)
    return {
        'token': access_token
    }, 200


@users.route('/register', methods=['POST'])
def register():
    req = request.get_json()
    is_valid, errors = valid_registration(req)
    if not is_valid:
        return errors, 401

    user = User.objects(email=req['email']).first()
    if user:
        return {
            'email': 'Account could not be created. User already exists.',
            'password': ''
        }, 409

    new_user = User(**req)
    pw_hash = bcrypt.generate_password_hash(new_user.password).decode('utf-8')
    new_user.password = str(pw_hash)
    new_user.save()

    access_token = create_access_token(identity=new_user)
    return {
        'token': access_token
    }, 201