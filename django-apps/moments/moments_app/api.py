from moments.settings import MY_DEBUG


if MY_DEBUG:
    def get_friends(id):
        return f'http://127.0.0.1:8082/api/friends/{id}/'

    def get_is_user_exists_url(id):
        return f'http://127.0.0.1:8080/api/users/exists/{id}/'
else:
    def get_friends(id):
        return f'http://178.154.245.200/api/friends/{id}/'

    def get_is_user_exists_url(id):
        return f'http://178.154.245.200/api/users/exists/{id}/'
