start apps:
    cd django-apps
    uwsgi --emperor "*/uwsgi.ini"

Для прода:
    в settings MY_DEBUG = false
    в spa в env DEBUG False