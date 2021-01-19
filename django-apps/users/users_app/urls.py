from .views import (
    get_all_users,
    get_user,
    get_me,
    create_user,
    update_user,
    is_user_exists,
    like_by_id,
    dislike_by_id,
    change_user_photo,
    get_user_id,
    find_user
)
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('all/', get_all_users, name='all_users'),
    path('chPhoto/', change_user_photo, name='change_user_photo'),
    path('exists/<int:id>/', is_user_exists, name='is_user_exists'),
    path('rate/like/', like_by_id, name='like_by_id'),
    path('rate/dislike/', dislike_by_id, name='dislike_by_id'),
    path('me/', get_me, name='me_user'),
    path('<int:id>/', get_user, name='get_user'),
    path('create/', create_user, name='create_user'),
    path('update/', update_user, name='update_user'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/<slug:username>/', get_user_id, name='get_me_id'),
    path('user/<slug:username>/', find_user, name='find_user'),
]
