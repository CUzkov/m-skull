from rest_framework import generics
from django.contrib.auth import get_user_model
from users_app.serializers import UserSerializer

User = get_user_model()

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
