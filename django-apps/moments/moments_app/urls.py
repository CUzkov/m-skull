from .views import (
    get_all_posts,
    get_user_posts
)
from django.urls import path

urlpatterns = [
    path('moments/all/', get_all_posts, name='all_posts'),
    path('moments/user/<int:id>/', get_user_posts, name='user_posts')
]
