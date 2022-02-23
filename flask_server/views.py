from flask import request, jsonify, make_response, session
from flask_server import app
from flask_bcrypt import Bcrypt

testData = {
    "aha": 500
}

# Session persists even when server is restarted?
# I wonder where it is stored


@app.route('/api/home', methods = ['GET'])
def api_home():
    session['count'] = (session.get('count') or 0) + 1
    retDict = testData.copy()
    retDict['count'] = session['count']
    return jsonify(retDict)


@app.route('/api/login', methods = ['GET'])
def api_login():

    return False
