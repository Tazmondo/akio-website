'''Database Tables'''
from flask_server import db



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False,)
    password = db.Column(db.String, unique=False, nullable=False)
    admin = db.Column(db.Boolean, nullable=False)



class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    frontImageUrl = db.Column(db.String)  # Could there possibly be an item without any thumbnail?
    backImageUrl = db.Column(db.String)  # Should only be present if there is a front-image
    price = db.Column(db.Integer, nullable=False)  # Price in pence

    sizes = db.relationship('ItemSize', backref = 'item', lazy = 'dynamic')



'''Size Guide:
    -> 0 = small
    -> 1 = medium
    -> 2 = large
    
    Using integers instead of strings because they are more space efficient
'''


class ItemSize(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    size = db.Column(db.String, nullable = False)
    stock = db.Column(db.Integer, nullable=False)
    
    itemId = db.Column(db.Integer, db.ForeignKey('item.id'), nullable = False)
