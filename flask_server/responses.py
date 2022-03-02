from flask import session, make_response, jsonify

# Response attributes
# success: boolean
# user: string
# message: string


def new_response(success: bool, message: str = "", code: int = 400, **others):
    newResponse = make_response(jsonify({
        "success": success,
        "message": message,
        "user": session.get('username', ""),
        **others
        }))

    newResponse.status_code = 200 if success else code

    return newResponse
