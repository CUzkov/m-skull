"""user model views functions"""

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

User = get_user_model()

@api_view(http_method_names=['GET'])
@permission_classes([IsAdminUser])
def get_all_users(request):
    """ get all users"""
    users = User.objects.all()
    serializers_users = UserSerializer(users, many=True)
    return Response({
        "data": {
            "users": serializers_users.data
        }
    })

@api_view(http_method_names=['GET'])
@permission_classes([IsAdminUser, IsAuthenticatedOrReadOnly])
def get_me(request):
    user = User.objects.filter(id=request.user.id)
    serializers_user = UserSerializer(user, many=True)
    return Response({
        "data": {
            "user": serializers_user.data[0]
        }
    })

@api_view(http_method_names=['GET'])
@permission_classes([])
def get_user(request, id=1):
    user = User.objects.filter(id=id)
    serializers_user = UserSerializer(user, many=True)
    if not serializers_user.data:
        return Response({
            "data": {
                "user": {}
            }
        })
    return Response({
        "data": {
            "user": serializers_user.data[0]
        }
    })

@api_view(http_method_names=['POST'])
@permission_classes([])
def create_user(request):
    try:
        data = json.loads(request.body)
    except JSONDecodeError as e:
        return Response({
            "response": "bad json format"
        })
    serializes_user = UserSerializer(data=data)
    if serializes_user.is_valid(raise_exception=True):
        user = serializes_user.save()
        return Response({
            "response": "Success create user"
        })
    return Response({
        "response": "bad data",
        "needs": serializes_user.errors
    })

@api_view(http_method_names=['PUT'])
@permission_classes([])
def update_user(request):
    try:
        data = json.loads(request.body)
    except JSONDecodeError as e:
        return Response({
            "response": "bad json format"
        })
    user = User.objects.get(id=request.user.id)
    serialisers_user = UserSerializer(instance=user, data=data, partial=True)
    if serialisers_user.is_valid(raise_exception=True):
        user = serialisers_user.save()
        return Response({
            "response": "Success update user"
        })
    return Response({
        "response": "bad data",
        "needs": serializes_user.errors
    })
