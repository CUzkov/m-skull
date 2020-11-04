def get_friends(id):
    return f'http://127.0.0.1:8082/api/friends/{id}/'


def get_is_user_exists_url(id):
    return f'http://127.0.0.1:8080/api/users/exists/{id}/'