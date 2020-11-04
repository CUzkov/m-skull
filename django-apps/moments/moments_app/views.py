from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Moment, Image
from .serializers import MomentSerializer
from datetime import datetime
from .api import get_friends, get_is_user_exists_url
import requests
import json
from json import JSONDecodeError
from .utils import add_file_to_model
import subprocess
from django.conf import settings


@api_view(http_method_names=['GET'])
@permission_classes([])
def get_all_moments(request):
    paginator = PageNumberPagination()
    moments = Moment.objects.all().order_by('id')
    context = paginator.paginate_queryset(moments, request)
    serializers_moments = MomentSerializer(context, many=True)
    return paginator.get_paginated_response(serializers_moments.data)


@api_view(http_method_names=['GET'])
@permission_classes([])
def get_user_moments(request, id=1):
    paginator = PageNumberPagination()
    moments = Moment.objects.filter(user_id=id).order_by('id')
    context = paginator.paginate_queryset(moments, request)
    serializers_moments = MomentSerializer(context, many=True)
    return paginator.get_paginated_response(serializers_moments.data)


@api_view(http_method_names=['POST'])
@permission_classes([])
def create_moment(request):
    data = dict(request.POST)
    for entry in data:
        data[entry] = data[entry][0]
    data.update({
        'creation_date': datetime.today(),
        'date_of_update': datetime.today()
    })
    if data.get('likes'):
        data.__delattr__('likes')
    serializer_moment = MomentSerializer(data=data)
    if (serializer_moment.is_valid(raise_exception=True)):
        moment = serializer_moment.save()
        for img in dict(request.FILES):
            Image.objects.create(
                image=request.FILES[img],
                moment=moment,
                image_name=img
            )
        add_file_to_model('comments', moment)
        add_file_to_model('likes', moment)
        return Response({
            "response": "Success create moment"
        })
    return Response({
        "response": "bad data"
    })


@api_view(http_method_names=['GET'])
@permission_classes([])
def get_user_tape(request, id):
    response = requests.get(get_friends(id))
    try:
        response_body = json.loads(response.text)
    except JSONDecodeError:
        return Response({
            "response": "user not found"
        }, status=500)
    friends_id = list(map(int, response_body['response']['users']))
    paginator = PageNumberPagination()
    moments = Moment.objects.filter(user_id__in=friends_id)
    context = paginator.paginate_queryset(moments, request)
    serializers_moments = MomentSerializer(context, many=True)
    return paginator.get_paginated_response(serializers_moments.data)


@api_view(http_method_names=['PUT'])
@permission_classes([])
def add_like_by_id(request):
    data = json.loads(request.body)
    moment = Moment.objects.filter(id=data.get('moment_id', 0))
    response = requests.get(get_is_user_exists_url(data.get("user_id", 0)))
    if not moment or ('not' in response.text):
        return Response({
            "response": "not found moment or user"
        })
    check = ''
    try:
        check = subprocess.check_output([
            'grep',
            f'i{data["user_id"]};',
            settings.MEDIA_ROOT + f'likes/{moment[0].id}.txt'
        ]).decode('utf-8')
    except Exception:
        pass
    if not check:
        with open(settings.MEDIA_ROOT + f'likes/{moment[0].id}.txt', 'a') as f:
            f.write(f'i{data["user_id"]};\n')
        moment[0].likes = moment[0].likes + 1
        moment[0].save()
        return Response({
            "response": "success liked"
        })
    else:
        return Response({
            "response": "already liked"
        })


@api_view(http_method_names=['PUT'])
@permission_classes([])
def del_like_by_id(request):
    data = json.loads(request.body)
    moment = Moment.objects.filter(id=data.get('moment_id', 0))
    response = requests.get(get_is_user_exists_url(data.get("user_id", 0)))
    if not moment or ('not' in response.text):
        return Response({
            "response": "not found moment or user"
        })
    check = ''
    try:
        check = subprocess.check_output([
            'grep',
            f'i{data["user_id"]};',
            settings.MEDIA_ROOT + f'likes/{moment[0].id}.txt'
        ]).decode('utf-8')
    except Exception:
        pass
    if check:
        subprocess.call([
            'sed',
            '-i',
            f'/i{data["user_id"]};/d',
            settings.MEDIA_ROOT + f'likes/{moment[0].id}.txt'
        ])
        moment[0].likes = moment[0].likes - 1
        moment[0].save()
        return Response({
            "response": "success disliked"
        })
    else:
        return Response({
            "response": "already disliked"
        })
