"""user model views functions"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
)
from django.contrib.auth import get_user_model
from users_app.serializers import UserSerializer
from rest_framework.response import Response
import json
from json import JSONDecodeError
import requests
from .apis import subscribers_create_user
from users.settings import MEDIA_ROOT
import os
from django.core.files.images import ImageFile

User = get_user_model()


@api_view(http_method_names=['GET'])
@permission_classes([])
def find_user(request, username=''):
    """find users by slug"""
    users = User.objects.filter(username__startswith=username)
    serializers_users = UserSerializer(users, many=True)
    return Response({
        "data": serializers_users.data
    })


@api_view(http_method_names=['POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def change_user_photo(request):
    """change user photo"""
    user = User.objects.get(id=request.user.id)
    try:
        img = dict(request.FILES)["file"][0]
    except KeyError:
        return Response({
            "error": "not file"
        })
    finally:
        old_path = MEDIA_ROOT + user.profile_image.url[7:]
        try:
            os.remove(old_path)
        except Exception:
            pass
        user.profile_image = img
        user.save()
        return Response({
            "success": "success"
        })


@api_view(http_method_names=['GET'])
@permission_classes([])
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
@permission_classes([IsAuthenticatedOrReadOnly])
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
            "error": "not found"
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
    data = json.loads(request.body.decode())
    data.update({
        "likes": 0,
        "dislikes": 0,
        "profile_image": ImageFile(open('/home/cuzkov/www.m-skull.ru/users/unnamed.jpg', 'rb')),
        "status": ""
    })
    serializes_user = UserSerializer(data=data)
    if (serializes_user.is_valid(raise_exception=True)):
        if User.objects.last() is not None:
            buffer_id = User.objects.last().id + 1
        else:
            buffer_id = 1
        response = requests.post(
            url=subscribers_create_user,
            json={
                "user": {
                    "id": buffer_id
                }
            }
        )
        if json.loads(response.text)['response'] == 'success':
            serializes_user.save()
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
@permission_classes([IsAuthenticatedOrReadOnly])
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
        }, status=400)
    user_purpose = user_purpose[0]
    user_src = user_src[0]
    if str(f'id{user_src.id}') in user_purpose.likes_user_id:
        check_like = True
    else:
        check_like = False
    if str(f'id{user_src.id}') in user_purpose.dislikes_user_id:
        check_dislike = True
    else:
        check_dislike = False
    if check_like:
        return Response({
            "response": "already like"
        })
    else:
        user_purpose.likes_user_id = (
            str(user_purpose.likes_user_id) + str(f'\nid{user_src.id}')
        )
        user_purpose.likes = user_purpose.likes + 1
    if check_dislike:
        user_purpose.dislikes_user_id = (
            user_purpose.dislikes_user_id.replace(f'id{user_src.id}', '')
        )
        user_purpose.dislikes = user_purpose.dislikes - 1
    user_purpose.save()
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
    user_purpose = user_purpose[0]
    user_src = user_src[0]
    if str(f'id{user_src.id}') in user_purpose.likes_user_id:
        check_like = True
    else:
        check_like = False
    if str(f'id{user_src.id}') in user_purpose.dislikes_user_id:
        check_dislike = True
    else:
        check_dislike = False
    if check_dislike:
        return Response({
            "response": "already dislike"
        })
    else:
        user_purpose.dislikes_user_id = (
            str(user_purpose.dislikes_user_id) + str(f'\nid{user_src.id}')
        )
        user_purpose[0].dislikes = user_purpose[0].dislikes + 1
    if check_like:
        user_purpose.likes_user_id = (
            user_purpose.likes_user_id.replace(f'id{user_src.id}', '')
        )
        user_purpose[0].likes = user_purpose[0].likes - 1
    user_purpose[0].save()
    return Response({
        "response": "success dislike"
    })


@api_view(http_method_names=['GET'])
@permission_classes([])
def get_user_id(request, username):
    try:
        user = User.objects.get(username=username)
    except Exception:
        return Response({
            "error": "user not found"
        })
    return Response({
        "data": {
            "id": user.id
        }
    })
