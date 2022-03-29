from flask import request, session, send_from_directory
from flask_server import app, db, bcrypt
from flask_server.auth import admin_required
from flask_server.models import User, Item, ItemSize
from flask_server.responses import new_response
from flask_server.validation import validate_admin_post, validate_item_post

@app.errorhandler(404) # idk of a better way to do this
def serve_react(e):   # Also ideally the WGSI (probably waitress) will serve the static files so this is temporary
    return send_from_directory('./build', 'index.html')


@app.route('/api/home', methods = ['GET'])
def api_home():
    username = session.get('username') or "No one"

    return new_response(True, f'Logged in as {username}')


# shows admin data, fetched when user logs in to admin page
@app.route('/api/admin-page', methods = ['GET'])
@admin_required()
def admin_page():
    return new_response(True, '...')



@app.route('/api/admins', methods = ['GET', 'POST'])
@admin_required()
def api_admin():
    if request.method == "POST":
        data = request.get_json()
        operation = data.get('operation')

        if not validate_admin_post(data):
            return new_response(False, 'Invalid data')

        if operation == 'ADD':
            username = data['username']
            password = data['password']
            encrypted_password = bcrypt.generate_password_hash(password).decode('utf-8')

            #check if username is already taken
            taken_usernames = [user.username for user in User.query.all()]
            if username in taken_usernames:
                return new_response(False, 'Username already taken')


            new_admin = User(
                                username = username,
                                password = encrypted_password,
                                admin = True
                            )

            db.session.add(new_admin)
            db.session.commit()

            return new_response(True, 'Created new admin')

        elif operation == 'DELETE':
            username = data['username']
            target_user = User.query.filter_by(username = username).first()
            db.session.delete(target_user)
            db.session.commit()

            return new_response(True, 'Deleted admin')

    elif request.method == "GET":
        admins = User.query.filter_by(admin = True).all()

        # used dictionary instead of list with just usernames in case we add 
        #more fields to the user table in the future

        output_dict = {
                        admin.username: {'username' : admin.username}
                        for admin in admins
                    }

        return new_response(True, 'Fetched Admins', admins = output_dict)




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



@app.route('/api/items', methods = ['GET', 'POST'])
@admin_required(["POST"])
def api_items():
    if request.method == "POST":
        data = request.get_json()
        if not validate_item_post(data):
            return new_response(False, "Invalid data")
        operation = data['operation']

        if operation == "DELETE":
            itemNames = data['items']
            names = [item['name'] for item in itemNames] #necessary to avoid bug in query

            matchingItems = Item.query.filter(Item.name.in_(names)).all()
            numDeleted = len(matchingItems)

            #delete items individually, more robust and does not have big effect on performance
            for item in matchingItems:
                db.session.delete(item)

            db.session.commit()

            response = new_response(True, f'Successfully deleted {numDeleted} items.')
            return response

        elif operation == "ADD":
            itemObjects = data['items']
            for itemObject in itemObjects:
                newItem = Item(
                    name = itemObject['name'],
                    frontImageUrl = itemObject['frontImageUrl'],
                    backImageUrl = itemObject['backImageUrl'],
                    price = itemObject['price'],
                    sizes = list(map(lambda sizeInput: ItemSize(
                        size = sizeInput["size"],
                        stock = sizeInput["stock"]
                    ), itemObject["sizes"]))
                )
                if Item.query.filter(Item.name == itemObject['name']).first() is None:
                    db.session.add(newItem)
                else:
                    return new_response(False, f"Item of name {itemObject['name']} already exists.")
            db.session.commit()

            return new_response(True, f'Successfully added {len(itemObjects)} new items.')


    elif request.method == 'GET':
        items = Item.query.all()
        output_dict = {
            item.name : {
                'frontImageUrl' : item.frontImageUrl,
                'backImageUrl' : item.backImageUrl,
                'price' : item.price,
                'name' : item.name,  # Doesn't hurt to have this as a value as well,
                'sizes': {
                    size.size: {
                        'size': size.size,
                        'stock': size.stock,
                    }
                    for size in item.sizes
                }

            }
            for item in items
        }
        response = new_response(True, 'Fetched Items', items = output_dict)
        return response
    return ""
