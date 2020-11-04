from .views import (
    add_user,
    update_friends,
    get_user_friends
)
from django.urls import path

urlpatterns = [
    path('friends/add/user/', add_user, name='add_user'),
    path('friends/<int:id>/', get_user_friends, name='get_user_friends'),
    path(
        'friends/update/<int:id>/',
        update_friends,
        name='update_subscription'
    )
]
