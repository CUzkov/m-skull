from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Moment, Image, Tag
from .serializers import MomentSerializer
from datetime import datetime
from .api import get_friends, get_is_user_exists_url
import requests
import json
from json import JSONDecodeError
from collections import OrderedDict


@api_view(http_method_names=['GET'])
@permission_classes([])
def get_all_moments(request, id):
    paginator = PageNumberPagination()
    moments = Moment.objects.all().order_by('id')
    context = paginator.paginate_queryset(moments, request)
    serializers_moments = MomentSerializer(context, many=True)
    i = 0
    buffer = []
    for moment in serializers_moments.data:
        images = Image.objects.filter(moment=serializers_moments.data[i]['id'])
        moment = dict(moment)
        moment['image'] = []
        for img in images:
            moment['image'].append(''.join(img.image.url))
        if str(id) in moment['liked_users_id']:
            moment['isLiked'] = True
        else:
            moment['isLiked'] = False
        i += 1
        buffer.append(OrderedDict(moment))
    return paginator.get_paginated_response(
        sorted(buffer, key=lambda x: x['creation_date'])
    )


@api_view(http_method_names=['GET'])
@permission_classes([])
def get_moment_by_id(request, id, user_id):
    try:
        moments = Moment.objects.get(id=id)
    except Exception:
        return Response({
            "error": "not found"
        })
    serializers_moments = MomentSerializer(moments)
    images = Image.objects.filter(moment=moments)
    moment = serializers_moments.data
    moment['image'] = []
    for img in images:
        moment['image'].append(''.join(img.image.url))
    if str(user_id) in moment['liked_users_id']:
        moment['isLiked'] = True
    else:
        moment['isLiked'] = False
    return Response({
        "data": moment
    })


@api_view(http_method_names=['GET'])
@permission_classes([])
def get_user_moments(request, id=1):
    if id == -1 or id == 0:
        return Response({
            "response": "bad user"
        }, status=404)
    paginator = PageNumberPagination()
    moments = Moment.objects.filter(user_id=id).order_by('id')
    context = paginator.paginate_queryset(moments, request)
    serializers_moments = MomentSerializer(context, many=True)
    i = 0
    buffer = []
    for moment in serializers_moments.data:
        images = Image.objects.filter(moment=serializers_moments.data[i]['id'])
        moment = dict(moment)
        moment['image'] = []
        for img in images:
            moment['image'].append(''.join(img.image.url))
        if str(id) in moment['liked_users_id']:
            moment['isLiked'] = True
        else:
            moment['isLiked'] = False
        i += 1
        buffer.append(moment)
    return paginator.get_paginated_response(
        sorted(buffer, key=lambda x: x['creation_date'])
    )


@api_view(http_method_names=['POST'])
@permission_classes([])
def create_moment(request):
    data = dict(request.POST)
    for entry in data:
        data[entry] = data[entry][0]
    data.update({
        'creation_date': datetime.today(),
        'date_of_update': datetime.today(),
    })
    data_tags = []
    if data.get('likes'):
        del data['likes']
    if data.get('tags'):
        data_tags = data.get('tags')
        del data['tags']
    serializer_moment = MomentSerializer(data=data)
    if (serializer_moment.is_valid(raise_exception=True)):
        moment = serializer_moment.save()
        for img in dict(request.FILES):
            Image.objects.create(
                image=request.FILES[img],
                moment=moment,
                image_name=img
            )
        if data_tags:
            data_tags = set(data_tags.split(' '))
            for tag in data_tags:
                if not Tag.objects.filter(title=tag):
                    tag_obj = Tag.objects.create(title=tag)
                tag_obj = Tag.objects.filter(title=tag)[0]
                tag_obj.moments_id_file = (
                    tag_obj.moments_id_file + f'\r{tag_obj.id}={tag_obj.title}'
                )
                moment.tags_id = (
                    moment.tags_id + '\r' + str(moment.id)
                )
        return Response({
            "response": "Success create moment"
        })
    return Response({
        "response": "bad data"
    })


@api_view(http_method_names=['GET'])
@permission_classes([])
def get_user_tape(request, id):
    if id == 0 or id == -1:
        return Response({
            "response": "user not found"
        }, status=404)
    response = requests.get(get_friends(id))
    try:
        response_body = json.loads(response.text)
    except JSONDecodeError:
        return Response({
            "response": "bad json"
        }, status=404)
    friends_id = list(map(int, response_body['response']['users']))
    friends_id.append(int(id))
    paginator = PageNumberPagination()
    moments = Moment.objects.filter(user_id__in=friends_id)
    context = paginator.paginate_queryset(moments, request)
    serializers_moments = MomentSerializer(context, many=True)
    i = 0
    buffer = []
    for moment in serializers_moments.data:
        images = Image.objects.filter(moment=serializers_moments.data[i]['id'])
        moment = dict(moment)
        moment['image'] = []
        for img in images:
            moment['image'].append(''.join(img.image.url))
        if str(id) in moment['liked_users_id']:
            moment['isLiked'] = True
        else:
            moment['isLiked'] = False
        i += 1
        buffer.append(moment)
    return paginator.get_paginated_response(
        sorted(buffer, key=lambda x: x['creation_date'])
    )


@api_view(http_method_names=['PUT'])
@permission_classes([])
def add_like_by_id(request):
    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return Response({
            "response": "bad json"
        })
    moment = Moment.objects.filter(id=data.get('moment_id', 0))
    response = requests.get(get_is_user_exists_url(data.get("user_id", 0)))
    if not moment or ('not' in response.text):
        return Response({
            "response": "not found moment or user"
        })
    moment = moment[0]
    if f'i{data["user_id"]};' in moment.liked_users_id:
        check = True
    else:
        check = False
    if not check:
        print(moment)
        moment.liked_users_id = (
            moment.liked_users_id +
            f'\ri{data["user_id"]};'
        )
        moment.likes = moment.likes + 1
        moment.save()
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
    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return Response({
            "response": "bad json"
        })
    moment = Moment.objects.filter(id=data.get('moment_id', 0))
    response = requests.get(get_is_user_exists_url(data.get("user_id", 0)))
    if not moment or ('not' in response.text):
        return Response({
            "response": "not found moment or user"
        })
    moment = moment[0]
    if f'i{data["user_id"]};' in moment.liked_users_id:
        check = True
    else:
        check = False
    if check:
        moment.liked_users_id = (
            moment.liked_users_id.replace(
                f'i{data["user_id"]};',
                ''
            )
        )
        moment.likes = moment.likes - 1
        moment.save()
        return Response({
            "response": "success disliked"
        })
    else:
        return Response({
            "response": "already disliked"
        })


@api_view(http_method_names=['PUT'])
@permission_classes([])
def add_comment(request, id):
    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return Response({
            "response": "bad json"
        })
    moment = Moment.objects.filter(id=data.get('moment_id', 0))
    response = requests.get(get_is_user_exists_url(data.get("user_id", 0)))
    comment = data.get('comment')
    if not moment or ('not' in response.text) or not comment:
        return Response({
            "response": "not found moment or user"
        })
    moment[0].comments = (
        moment[0].comments +
        '\r' +
        str(comment).replace('\n', ' ').replace('\t', ' ') +
        '\r' +
        str(id) +
        '\r' +
        str(datetime.now())
    )
    return Response({
        "response": "success"
    })
