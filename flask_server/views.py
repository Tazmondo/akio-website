from flask import request, jsonify, make_response, session
from flask_server import app, db, bcrypt
from flask_server.models import User

testData = {
    "aha": 500
}

# Session persists even when server is restarted?
# I wonder where it is stored


@app.route('/api/home', methods = ['GET'])
def api_home():
    username = session.get('username') or "No one"

    return f'Logged in as {username}'


@app.route('/api/login', methods = ['GET'])
def api_login():
    if request.method == "GET":
        try:
            username = request.args['username']
            password = request.args['password']

            targetUser = User.query.filter_by(username=username).first()

            if targetUser is not None:
                targetPassword = targetUser.password
                if bcrypt.check_password_hash(targetPassword, password):
                    session['username'] = username  # Hopefully this is a secure way of logging someone in
                    return "Logged in successfully"

                else:
                    return "Incorrect password"

            else:
                return "User not found"
            pass
        except KeyError:
            return "Invalid arguments"

    return ""


@app.route('/api/logout', methods = ['GET'])
def api_logout():
    if request.method == 'GET':
        prevName = session.get('username')
        if prevName is not None:
            del session['username']
            return f"Logged out of {prevName}"
        else:
            return "Already logged out"
    return ""

@app.route('/api/items', methods = ['GET', 'POST'])
def api_items():

    return ""
