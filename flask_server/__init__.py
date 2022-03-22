from flask import Flask
from os import environ

from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# app.config['DEBUG'] = True  Set FLASK_ENV to 'development' instead of setting this
app.config['SECRET_KEY'] = environ['SECRET_KEY']  # Set environment variable
app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

devMode = False

if app.config['ENV'] == 'development':
    devMode = True


if devMode:  # In production, assume that api and front-end at same url.
             # Therefore CORS config not needed
    cors = CORS(app, supports_credentials = True)


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

from flask_server import views
from flask_server import models
