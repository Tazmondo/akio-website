from flask import session, make_response, jsonify

# Response attributes
# success: boolean
# user: string
# message: string


def new_response(success: boolean, message: string = "", code: integer = 400):
    newResponse = make_response(jsonify({
            "success": success, 
            "message": message,
            "user": session.get('username', "")
        }))
    newResponse.status_code = success ? 200 : code

    return newResponse