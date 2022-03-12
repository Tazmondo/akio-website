from flask import session, request

from flask_server.models import User
from flask_server.responses import new_response

from functools import wraps

# If methods is empty, apply to all methods
def admin_required(methods: "list[str]" = None) -> callable:
    if methods is None:  # none default instead of [] to fix a bug with list defaults.
        methods = []

    def wrapperDecorator(apiFunction):  # see https://book.pythontips.com/en/latest/decorators.html

        @wraps(apiFunction)
        def wrapper(*args, **kwargs):
            if request.method in methods or len(methods) == 0:
                username = session.get('username')
                if username is None:
                    return new_response(False, "Not logged in. Admin login required.")
                
                user = User.query.filter_by(username=username).first()
                
                if user: #user may be none if account has just been deleted
                    if not user.admin:
                        return new_response(False, "Must be an admin user")
            return apiFunction(*args, **kwargs)

        return wrapper

    return wrapperDecorator
