from flask import session, make_response, jsonify

# Response attributes
# success: boolean
# user: string
# message: string


def new_response(success: bool, message: str = "", code: int = 400):
    newResponse = make_response(jsonify({
            "success": success, 
            "message": message,
            "user": session.get('username', "")
        }))

    newResponse.status_code = 200 if success else code

    return newResponse