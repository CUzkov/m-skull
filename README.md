start apps:
    cd django-apps
    uwsgi --emperor "*/uwsgi.ini"

user app api:
    1) api/token/
    2) api/auth/jwt/refresh/