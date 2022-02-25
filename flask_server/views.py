from flask import request, jsonify, make_response, session
from flask_server import app, db, bcrypt
from flask_server.models import User
from flask_server.responses import new_response


testData = {
    "aha": 500
}

# Session is permanent by default


@app.route('/api/home', methods = ['GET'])
def api_home():
    username = session.get('username') or "No one"

    return new_response(True, f'Logged in as {username}')



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
def api_items():
    if request.method == "POST":
        username = session.get('username')
        # get user db from username
        
    return ""

