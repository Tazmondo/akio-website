from flask import request, jsonify, make_response, session
from flask_server import app, db, bcrypt
from flask_server.models import User

testData = {
    "aha": 500
}

# Session is permanent by default


@app.route('/api/home', methods = ['GET'])
def api_home():
    username = session.get('username') or "No one"

    return f'Logged in as {username}'


@app.route('/api/login', methods = ['POST'])
def api_login():
    if request.method == "POST":
        data = request.get_json()
        if data is None:
            return "Invalid data"
        
        #use data.get or check that keys are in dictionary, because if someone sends request without these headers the server throws an error
        username = data['username']
        password = data['password']

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

    return ""


@app.route('/api/logout', methods = ['GET', 'POST'])
def api_logout():
    prevName = session.get('username')
    if prevName is not None:
        del session['username']
        return f"Logged out of {prevName}"
    else:
        return "Already logged out"


@app.route('/api/items', methods = ['GET', 'POST'])
def api_items():

    return ""
