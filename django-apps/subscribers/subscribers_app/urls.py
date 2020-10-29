from .views import (
    add_user
)
from django.urls import path

urlpatterns = [
    path('subscribers/add/user/', add_user, name='add_user'),
]
