from rest_framework.decorators import (
    api_view,
    permission_classes
)
from rest_framework.response import Response
from .models import Friend
from django.conf import settings
import json
from django.db.utils import IntegrityError
from .utils import get_relation
import subprocess


@api_view(http_method_names=['POST'])
@permission_classes([])
def add_user(request):
    request_body = json.loads(request.body)
    path_to_file = (
        str(settings.MEDIA_ROOT) +
        str(request_body['user']['id']) +
        '.txt'
    )
    with open(path_to_file, 'w+') as f:
        f.write('')
    try:
        friends_list = Friend.objects.create(
            user_id=request_body['user']['id']
        )
    except IntegrityError:
        return Response({
            "response": "must be unique"
        })
    friends_list.friends_file.name = str(request_body['user']['id']) + '.txt'
    friends_list.save()
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
            "response": "no such users"
        })
    data = ''
    try:
        data = subprocess.check_output([
            'grep',
            f'i{purpose_id}',
            friends_list_user.friends_file.path
        ]).decode('utf-8')
    except Exception:
        pass

    if not data:
        with open(friends_list_user.friends_file.path, 'a') as f:
            f.write(f'i{request_body["user"]["id"]}=01\n')
        with open(friends_list_purpose.friends_file.path, 'a') as f:
            f.write(f'i{id}=10\n')
    else:
        relation = get_relation(data, request_body["user"]["status"])
        if relation[0] == '00':
            subprocess.call([
                'sed',
                '-i',
                f'/i{purpose_id}=/d',
                friends_list_user.friends_file.path
            ])
            subprocess.call([
                'sed',
                '-i',
                f'/i{id}=/d',
                friends_list_purpose.friends_file.path
            ])
        else:
            subprocess.call([
                'sed',
                '-i',
                f's/.*i{purpose_id}=.*/i{purpose_id}={relation[0]}\n/',
                friends_list_user.friends_file.path
            ])
            subprocess.call([
                "sed",
                '-i',
                f's/.*i{id}=.*/i{id}={relation[1]}\n/',
                friends_list_purpose.friends_file.path
            ])
    return Response({
        "response": "success"
    })


@api_view(['GET'])
@permission_classes([])
def get_user_friends(request, id):
    try:
        friends = Friend.objects.get(id=id)
    except Exception:
        return Response({
            "response": "User not found"
        })
    data = subprocess.check_output([
        'grep',
        r'11\|01',
        friends.friends_file.path
    ]).decode('utf-8')
    data_dict = {
        'users': []
    }
    data = data.split('\n')
    for s in data:
        s_buff = s.split('=')
        if s_buff:
            data_dict['users'].extend(s_buff[0][1::])
    return Response({
        "response": data_dict
    })
