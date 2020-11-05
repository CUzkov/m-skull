"""user model views functions"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import (
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from django.contrib.auth import get_user_model
from users_app.serializers import UserSerializer
from rest_framework.response import Response
import json
from json import JSONDecodeError
import requests
from .apis import subscribers_create_user
from .utils import add_file_to_model
import subprocess
from django.conf import settings

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
    """get user that auth"""
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
    """get user by qs number"""
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
    """create user"""
    data = dict(request.POST)
    for entry in data:
        data[entry] = data[entry][0]
    data.update({
        "likes": 0,
        "dislikes": 0,
        "profile_image": dict(request.FILES).get('photo', None)
    })
    if data["profile_image"] is not None:
        data["profile_image"] = data["profile_image"][0]
    serializes_user = UserSerializer(data=data)
    if (serializes_user.is_valid(raise_exception=True)):
        response = requests.post(
            url=subscribers_create_user,
            json={
                "user": {
                    "id": User.objects.last().id + 1
                }
            }
        )
        if json.loads(response.text)['response'] == 'success':
            user = serializes_user.save()
            add_file_to_model('likes', user)
            add_file_to_model('dislikes', user)
            return Response({
                "response": "Success create user"
            })
        else:
            return Response({
                "response": "friend service error, try again"
            })
    if json.loads(response.text)['response'] != 'success':
        response_str = 'server error, try again'
    else:
        response_str = 'bad data'
    return Response({
        "response": response_str,
        "needs": serializes_user.errors
    })


@api_view(http_method_names=['PUT'])
@permission_classes([])
def update_user(request):
    """update user"""
    try:
        data = json.loads(request.body)
    except JSONDecodeError:
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
        "needs": serialisers_user.errors
    })


@api_view(http_method_names=['GET'])
@permission_classes([])
def is_user_exists(request, id):
    """check user is exists"""
    user = User.objects.filter(id=id)
    if user:
        return Response({
            "response": "exists"
        })
    else:
        return Response({
            "response": "not exists"
        })


@api_view(http_method_names=['PUT'])
@permission_classes([])
def like_by_id(request):
    """add like to user by user"""
    data = json.loads(request.body)
    user_purpose = User.objects.filter(id=data.get('user_purpose_id', 0))
    user_src = User.objects.filter(id=data.get('user_src_id', 0))
    if not user_purpose or not user_src:
        return Response({
            "response" "User not found or no change type"
        })
    check_like = ''
    check_dislike = ''
    try:
        check_like = subprocess.check_output([
            'grep',
            f'i{user_src[0].id};',
            settings.MEDIA_ROOT + f'likes/{user_purpose[0].id}.txt'
        ]).decode('utf-8')
    except Exception:
        pass
    try:
        check_dislike = subprocess.check_output([
            'grep',
            f'i{user_src[0].id};',
            settings.MEDIA_ROOT + f'dislikes/{user_purpose[0].id}.txt'
        ]).decode('utf-8')
    except Exception:
        pass
    if check_like:
        return Response({
            "response": "already like"
        })
    else:
        with open(
            settings.MEDIA_ROOT + f'likes/{user_purpose[0].id}.txt',
            'a'
        ) as f:
            f.write(f'i{user_src[0].id};\n')
        user_purpose[0].likes = user_purpose[0].likes + 1
    if check_dislike:
        subprocess.call([
            'sed',
            '-i',
            f'/i{user_src[0].id};/d',
            settings.MEDIA_ROOT + f'dislikes/{user_purpose[0].id}.txt',
        ])
        user_purpose[0].dislikes = user_purpose[0].dislikes - 1
    user_purpose[0].save()
    return Response({
        "response": "success like"
    })


@api_view(http_method_names=['PUT'])
@permission_classes([])
def dislike_by_id(request):
    """add dislike to user by user"""
    data = json.loads(request.body)
    user_purpose = User.objects.filter(id=data.get('user_purpose_id', 0))
    user_src = User.objects.filter(id=data.get('user_src_id', 0))
    if not user_purpose or not user_src:
        return Response({
            "response" "User not found or no change type"
        })
    check_like = ''
    check_dislike = ''
    try:
        check_like = subprocess.check_output([
            'grep',
            f'i{user_src[0].id};',
            settings.MEDIA_ROOT + f'likes/{user_purpose[0].id}.txt'
        ]).decode('utf-8')
    except Exception:
        pass
    try:
        check_dislike = subprocess.check_output([
            'grep',
            f'i{user_src[0].id};',
            settings.MEDIA_ROOT + f'dislikes/{user_purpose[0].id}.txt'
        ]).decode('utf-8')
    except Exception:
        pass
    if check_dislike:
        return Response({
            "response": "already dislike"
        })
    else:
        with open(
            settings.MEDIA_ROOT + f'dislikes/{user_purpose[0].id}.txt',
            'a'
        ) as f:
            f.write(f'i{user_src[0].id};\n')
        user_purpose[0].dislikes = user_purpose[0].dislikes + 1
    if check_like:
        subprocess.call([
            'sed',
            '-i',
            f'/i{user_src[0].id};/d',
            settings.MEDIA_ROOT + f'likes/{user_purpose[0].id}.txt',
        ])
        user_purpose[0].likes = user_purpose[0].likes - 1
    user_purpose[0].save()
    return Response({
        "response": "success dislike"
    })
