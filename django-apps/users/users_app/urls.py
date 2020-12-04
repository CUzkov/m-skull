from .views import (
    get_all_users,
    get_user,
    get_me,
    create_user,
    update_user,
    is_user_exists,
    like_by_id,
    dislike_by_id,
    change_user_photo
)
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('users/all/', get_all_users, name='all_users'),
    path('users/chPhoto/', change_user_photo, name='change_user_photo'),
    path('users/exists/<int:id>/', is_user_exists, name='is_user_exists'),
    path('users/rate/like/', like_by_id, name='like_by_id'),
    path('users/rate/dislike/', dislike_by_id, name='dislike_by_id'),
    path('users/me/', get_me, name='me_user'),
    path('users/<int:id>/', get_user, name='get_user'),
    path('users/create/', create_user, name='create_user'),
    path('users/update/', update_user, name='update_user'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
