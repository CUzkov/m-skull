from .views import (
    add_user,
    update_subscription
)
from django.urls import path

urlpatterns = [
    path('friends/add/user/', add_user, name='add_user'),
    path(
        'friends/update/<int:id>/',
        update_subscription,
        name='update_subscription'
    )
]
