from rest_framework.decorators import (
    api_view,
    permission_classes
)
from rest_framework.response import Response
from .models import Friend
import json
from django.db.utils import IntegrityError
from .utils import get_relation


@api_view(http_method_names=['POST'])
@permission_classes([])
def add_user(request):
    request_body = json.loads(request.body)
    try:
        Friend.objects.create(
            user_id=request_body['user']['id'],
            user_friends=''
        )
    except IntegrityError:
        return Response({
            "response": "must be unique"
        })
    return Response({
        "response": "success"
    })


@api_view(http_method_names=['PUT'])
@permission_classes([])
def update_friends(request, id=1):
    request_body = json.loads(request.body)
    friends_list_user = Friend.objects.get(user_id=id)
    friends_list_purpose = Friend.objects.get(
        user_id=request_body["user"]["id"]
    )
    purpose_id = request_body["user"]["id"]
    if not friends_list_user or not friends_list_purpose:
        return Response({
            "error": "no such users"
        })
    if f'i{purpose_id}' in friends_list_user.user_friends:
        data = friends_list_user.user_friends.find(f'i{purpose_id}')
        data = friends_list_user.user_friends[
            (data + len(f'i{purpose_id}') + 1):
            (data + len(f'i{purpose_id}') + 3)
        ]
    else:
        data = ''
    if not data:
        friends_list_user.user_friends = (
            friends_list_user.user_friends +
            f'\ri{request_body["user"]["id"]}=01'
        )
        friends_list_purpose.user_friends = (
            friends_list_purpose.user_friends +
            f'\ri{id}=10'
        )
    else:
        relation = get_relation(data, request_body["user"]["status"])
        if relation[0] == '00':
            friends_list_user.user_friends = (
                friends_list_user.user_friends.replace(
                    '\r' + f'i{purpose_id}=' + str(data),
                    ''
                )
            )
            print(friends_list_user.user_friends)
            friends_list_purpose.user_friends = (
                friends_list_purpose.user_friends.replace(
                    '\r' + f'i{id}=' + str(data)[::-1],
                    ''
                )
            )
            print(friends_list_purpose.user_friends)
        else:
            friends_list_user.user_friends = (
                friends_list_user.user_friends.replace(
                    f'i{purpose_id}={data}',
                    f'i{purpose_id}={relation[0]}\r'
                )
            )
            friends_list_purpose.user_friends = (
                friends_list_purpose.user_friends.replace(
                    f'i{id}={data[::-1]}',
                    f'i{id}={relation[1]}\r'
                )
            )
    friends_list_purpose.save()
    friends_list_user.save()
    return Response({
        "response": "success"
    })


@api_view(['GET'])
@permission_classes([])
def get_user_friends(request, id):
    try:
        friends = Friend.objects.get(user_id=id)
    except Exception:
        return Response({
            "response": "User not found"
        })
    data = friends.user_friends.split('\r')
    data_dict = {
        'users': []
    }
    for entry in data:
        if entry[-2::] == '11' or entry[-2::] == '01':
            data_dict['users'].extend(entry.split('=')[0][1::])
    return Response({
        "response": data_dict
    })


@api_view(['GET'])
@permission_classes([])
def is_purpose_user_friend(request, uId, pId):
    try:
        friends = Friend.objects.get(user_id=uId)
    except Exception:
        return Response({
            "response": "User not found"
        })
    data_dict = {
        'isFriends': False,
        'isHeSub': False,
        'isWeSub': False,
        'isNotConf': True
    }
    data = friends.user_friends.split('\r')
    for entry in data:
        if str(f'i{pId}') in entry:
            if entry[-2::] == '11':
                data_dict["isFriends"] = True
                data_dict["isNotConf"] = False
            elif entry[-2::] == '01':
                data_dict["isWeSub"] = True
                data_dict["isNotConf"] = False
            elif entry[-2::] == '10':
                data_dict["isHeSub"] = True
                data_dict["isNotConf"] = False
    return Response({
        "data": {
            "confusing": data_dict
        }
    })
