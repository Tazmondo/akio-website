from datetime import timedelta
from flask import request, jsonify, make_response, session
from flask_server import app, db, bcrypt
from flask_server.models import User, Item
from flask_server.responses import new_response


testData = {
    "aha": 500
}



@app.route('/api/home', methods = ['GET'])
def api_home():
    username = session.get('username') or "No one"

    return new_response(True, f'Logged in as {username}')



#shows admin data, fetched when user logs in to admin page
@app.route('/api/admin-page', methods = ['GET'])
def admin_page():
    username = session.get('username')

    if username is None:
        return new_response(False, 'Not logged in')
    

    else:
        #return item list, stock, etc...

        return new_response(True, '...')


#INPUT DATA
#Operation: 
#Add:
    #username: string
    #password: string

#Delete:
    #username: string

def validate_admin_post(json_data):
    operation = json_data.get('operation')

    if operation == 'ADD':
        username = json_data.get('username')
        password = json_data.get('password')

        if username is None or type(username) is not str:
            return False

        if password is None or type(password) is not str:
            return False

        return True

    elif operation == 'DELETE':
        username = json_data.get('username')

        if username is None or type(username) is not str:
            return False

        return True



@app.route('/api/admins', methods = ['GET', 'POST'])
def manage_admins():
    if request.method == "POST":
        data = request.get_json()
        operation = data.get('operation')

        if not validate_admin_post(data):
            return new_response(False, 'Invalid data')
        
        operation = data['operation']

        if operation == 'ADD':
            username = data['username']
            password = data['password']
            encrypted_password = bcrypt.create_hash(password)
            
            new_admin = User(
                                username = username, 
                                password = encrypted_password,
                                admin = True
                            )

            db.session.add(new_admin)
            db.session.commit()

        elif operation == 'DELETE':
            username = data['username']
            target_user = User.query.filter_by(username = username).first()
            target_user.delete()
            db.session.commit()


    elif request.method == "GET":
        admins = User.query.filter_by(admin = True).all()
        
        # used dictionary instead of list with just usernames in case we add 
        #more fields to the user table in the future
        
        output_dict = {
                        admin.username: {'username' : admin.username} 
                        for admin in admins
                    }

        response = new_response(True, 'Fetched Admins', admins = output_dict)

        


# Input data:
# username: string
# password: string


@app.route('/api/login', methods = ['POST'])
def api_login():
    if request.method == "POST":
        data = request.get_json()
        if data is None:
            return new_response(False, "Invalid data, must be JSON")
        
        #use data.get or check that keys are in dictionary, because if someone sends request without these headers the server throws an error
        username = data.get('username')
        password = data.get('password')
        if username is None or password is None:
            return new_response(False, "Username or password not present in data.")

        targetUser = User.query.filter_by(username=username).first()

        if targetUser is not None:
            targetPassword = targetUser.password
            if bcrypt.check_password_hash(targetPassword, password):
                session['username'] = username  # Hopefully this is a secure way of logging someone in
                return new_response(True, "Logged in successfully")

            else:
                return new_response(False, "Incorrect password")

        else:
            return new_response(False, "User not found")


@app.route('/api/logout', methods = ['GET', 'POST'])
def api_logout():
    prevName = session.get('username')
    if prevName is not None:
        del session['username']
        return new_response(True, f"Logged out of {prevName}")
    else:
        return new_response(False, "Already logged out")


# Input data:
# operation: "ADD", "DELETE", "EDIT" (maybe)
# ADD:
#   items: array of items
#   an item:
#           name = db.Column(db.String, nullable=False)
#           stock = db.Column(db.Integer, nullable=False)
#           frontImageURL = db.Column(db.String)
#           backImageURL = db.Column(db.String)  
#           price = db.Column(db.Integer, nullable=False)  # Price in pence
#
# DELETE:
#   items: array of item names (strings)
#

def validate_item(itemDict):
    # Maybe move me to a dedicated file?
    if type(itemDict) is not dict:
        return False

    types = {
        "name": str,
        "stock": int,
        "frontImageUrl": str,  # For now, may change depending on future implementation
        "backImageUrl": str,
        "price": int
    }

    for key, classType in types.items():
        if type(itemDict.get(key, None)) is not classType:
            print(key)
            return False

    return True


def validate_item_post(jsonData):
    operation = jsonData.get('operation')
    if jsonData is None or operation is None:
        return False
    
    if operation == "DELETE":
        itemNames = jsonData.get('items')
        
        if itemNames is None or type(itemNames) is not list:
            return False
        
        if len(filter(lambda a: type(a) is not str, itemNames)) > 0:  # Check if any items in list aren't strings
            return False

        return True

    elif operation == "ADD":
        itemObjects = jsonData.get('items')

        if itemObjects is None or type(itemObjects) is not list:
            return False

        return any(map(lambda item: not validate_item(item), itemObjects))  # Return false if any element of list not valid

    return False  # operation not valid


@app.route('/api/items', methods = ['GET', 'POST'])
def api_items():
    if request.method == "POST":
        data = request.get_json()
        if not validate_item_post(data):
            return new_response(False, "Invalid data")
        operation = data['operation']

        username = session.get('username')
        if username is None:
            return new_response(False, "Invalid username")

        user = User.query.filter_by(username=username).first()
        if not user.admin:
            return new_response(False, "Must be an admin user")
        
        if operation == "DELETE":
            itemNames = data['items']

            matchingItemsQuery = Item.query.filter(Item.name in itemNames)
            matchingItems = matchingItemsQuery.all()  # Will this break? Using same query for two statements
            numDeleted = matchingItemsQuery.delete()
            db.session.commit()

            response = new_response(True, f'Successfully deleted {numDeleted} items.', items = matchingItems)
            return response

        elif operation == "ADD":
            itemObjects = data['items']
            for itemObject in itemObjects:
                newItem = Item(
                    name = itemObject['name'],
                    stock = itemObject['stock'],
                    frontImageUrl = itemObject['frontImageUrl'],
                    backImageUrl = itemObject['backImageUrl'],
                    price = itemObject['price']
                )
                db.session.add(newItem)
            db.session.commit()

            return new_response(True, f'Successfully added {len(itemObjects)} new items.')


    elif request.method == 'GET':
        items = Item.query.all()
        output_dict = {item.name : {'stock' : item.stock,
                                    'frontImageUrl' : item.frontImageUrl,
                                    'backImageUrl' : item.backImageUrl,
                                    'price' : item.price,
                                    'name' : item.name  # Doesn't hurt to have this as a value as well
                                    }
                         for item in items
                      }
        response = new_response(True, 'Fetched Items', items = output_dict)
        return response
    return ""