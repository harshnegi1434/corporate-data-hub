from flask import Flask
from .config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    login_manager.init_app(app)  # Initialize login_manager before registering blueprint
    
    from . import routes  # Importing routes after initializing app, db, and login_manager
    app.register_blueprint(routes.bp)
    
    return app
