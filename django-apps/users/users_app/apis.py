from users.settings import MY_DEBUG


if MY_DEBUG:
    subscribers_create_user = 'http://127.0.0.1:8082/api/friends/add/user/'
else:
    subscribers_create_user = 'http://178.154.245.200/api/friends/add/user/'
