from flask import Flask
from os import environ
from os.path import isfile

from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='', static_folder='./build')

# app.config['DEBUG'] = True  Set FLASK_ENV to 'development' instead of setting this
app.config['SECRET_KEY'] = environ['SECRET_KEY']  # Set environment variable
app.config['JSON_SORT_KEYS'] = False

devMode = False
dbFile = 'production.db'
newDb = True

if app.config['ENV'] == 'development':
    devMode = True


if devMode:  # In production, assume that api and front-end at same url.
             # Therefore CORS config not needed
    cors = CORS(app, supports_credentials = True)
    dbFile = 'test.db'

if isfile('flask_server/'+dbFile):
    newDb = False

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + dbFile

db = SQLAlchemy(app)

from flask_server import models

if newDb:  # If database does not already exists then set it up with necessary tables
    print("\nSetting up new database\n")
    db.create_all()


bcrypt = Bcrypt(app)

from flask_server import views
