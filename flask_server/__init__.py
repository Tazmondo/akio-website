from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'test_key'
app.config['JSON_SORT_KEYS'] = False


from flask_server import views
from flask_server import models

