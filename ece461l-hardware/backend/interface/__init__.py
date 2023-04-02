from flask import Flask
from database import db
from interface.config import Config
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

jwt = JWTManager()
bcrypt = Bcrypt()
cors = CORS()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)

    from interface.routes.main import main
    from interface.routes.user_Handling import users
    from interface.routes.hardware_Handling import hardware
    from interface.routes.project_Handling import projects

    app.register_blueprint(main)
    app.register_blueprint(users, url_prefix='/users')
    app.register_blueprint(hardware, url_prefix='/hardware')
    app.register_blueprint(projects, url_prefix='/projects')

    return app