from flask import Flask
from os import environ

from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['DEBUG'] = True
app.config['SECRET_KEY'] = environ['SECRET_KEY']  # Set environment variable
app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

cors = CORS(app, supports_credentials = True)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

from flask_server import views
from flask_server import models
