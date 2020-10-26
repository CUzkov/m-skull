from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import (
    IsAdminUser, 
    IsAuthenticatedOrReadOnly,
    IsAuthenticated
)
from django.contrib.auth import get_user_model
from users_app.serializers import UserSerializer
from rest_framework.response import Response
import json
from json import JSONDecodeError

@api_view(http_method_names=['GET'])
@permission_classes([])
