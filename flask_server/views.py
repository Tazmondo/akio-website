from flask import request, jsonify, make_response
from flask_server import app



@app.route('/api/home', methods = ['GET'])
def api_home():
    return 'test'
