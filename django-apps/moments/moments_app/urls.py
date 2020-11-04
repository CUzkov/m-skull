from .views import (
    get_all_moments,
    get_user_moments,
    create_moment,
    get_user_tape,
    add_like_by_id,
    del_like_by_id
)
from django.urls import path

urlpatterns = [
    path('moments/all/', get_all_moments, name='all_posts'),
    path('moments/like/add/', add_like_by_id, name='add_like_by_id'),
    path('moments/like/del/', del_like_by_id, name='del_like_by_id'),
    path('moments/create/', create_moment, name='create_posts'),
    path('moments/user/<int:id>/', get_user_moments, name='user_posts'),
    path('moments/user/tape/<int:id>/', get_user_tape, name='get_user_tape')
]
