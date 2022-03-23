def validate_admin_post(json_data):
    # INPUT DATA
    # Operation:
    # Add:
    #   username: string
    #   password: string

    # Delete:
    #   username: string
    operation = json_data.get('operation')

    if operation == 'ADD':
        username = json_data.get('username')
        password = json_data.get('password')

        if username is None or type(username) is not str or username == "":
            return False

        if password is None or type(password) is not str or password == "":
            return False

        return True

    elif operation == 'DELETE':
        username = json_data.get('username')

        if username is None or type(username) is not str:
            return False

        return True


def validate_item_size(itemSizeDict):
    if type(itemSizeDict) is not dict:
        return False

    types = {
        'size': int,
        'stock': int
    }

    for key, classType in types.items():
        if type(itemSizeDict.get(key, None)) is not classType:
            print(key)
            return False

    return True


def validate_item(itemDict):
    # Maybe move me to a dedicated file?
    if type(itemDict) is not dict:
        return False

    types = {
        "name": str,
        "frontImageUrl": str,  # For now, may change depending on future implementation
        "backImageUrl": str,
        "price": int,
        "sizes": list
    }

    for key, classType in types.items():
        if type(itemDict.get(key, None)) is not classType:
            print(key)
            return False

    for size in types["sizes"]:
        if not validate_item_size(size):
            return False

    return True


def validate_item_post(jsonData):
    # Input data:
    # operation: "ADD", "DELETE", "EDIT" (maybe)
    # ADD:
    #   items: array of items
    #   an item:
    #           name = db.Column(db.String, nullable=False)
    #           frontImageURL = db.Column(db.String)
    #           backImageURL = db.Column(db.String)
    #           price = db.Column(db.Integer, nullable=False)  # Price in pence
    #           sizes: an array of sizes
    #               size: int of 0, 1, 2 (small, medium, large)
    #               stock: int
    #
    # DELETE:
    #   items: array of item names (strings)
    #
    operation = jsonData.get('operation')
    if jsonData is None or operation is None:
        return False

    if operation == "DELETE":
        itemNames = jsonData.get('items')

        if itemNames is None or type(itemNames) is not list:
            return False

        if len(list(filter(lambda a: type(a) is not dict, itemNames))) > 0:  # Check if any items in list aren't strings
            return False

        return True

    elif operation == "ADD":
        itemObjects = jsonData.get('items')

        if itemObjects is None or type(itemObjects) is not list:
            return False

        return any(
            map(lambda item: not validate_item(item), itemObjects))  # Return false if any element of list not valid

    return False  # operation not valid
