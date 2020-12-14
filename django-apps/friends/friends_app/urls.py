from .views import (
    add_user,
    update_friends,
    get_user_friends,
    is_purpose_user_friend,
    get_user_friend_stats
)
from django.urls import path

urlpatterns = [
    path('friends/add/user/', add_user, name='add_user'),
    path('friends/<int:id>/', get_user_friends, name='get_user_friends'),
    path(
        'friends/update/<int:id>/',
        update_friends,
        name='update_subscription'
    ),
    path(
        'friends/isFriend/<int:pId>/<int:uId>/',
        is_purpose_user_friend,
        name='is_purpose_user_friend'
    ),
    path(
        'friends/stat/<int:id>/',
        get_user_friend_stats,
        name='get_user_friend_stats'
    )
]
