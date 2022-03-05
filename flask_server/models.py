'''Database Tables'''

from flask_server import db


# Inspired by your gym bot backend
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False,)
    password = db.Column(db.String, unique=False, nullable=False)
    admin = db.Column(db.Boolean, nullable=False)

    # email?
    # purchase history?
    pass


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    stock = db.Column(db.Integer, nullable=False)
    frontImageUrl = db.Column(db.String)  # Could there possibly be an item without any thumbnail?
    backImageUrl = db.Column(db.String)  # Should only be present if there is a front-image
    price = db.Column(db.Integer, nullable=False)  # Price in pence

    pass


