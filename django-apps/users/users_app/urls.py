from django.conf.urls import url
from .views import (
    get_all_users,
    get_user,
    create_user,
    update_user
)
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    url('users/all/', get_all_users, name='all_users'),
    url('users/me/', get_user, name='me_user'),
    url('users/create/', create_user, name='create_user'),
    url('users/update/', update_user, name='update_user'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
