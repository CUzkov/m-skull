from rest_framework.decorators import (
    api_view,
    permission_classes
)
from rest_framework.response import Response
from .models import Subscriber
from django.conf import settings
import json
from django.db.utils import IntegrityError


@api_view(http_method_names=['POST'])
@permission_classes([])
def add_user(request):
    print(request.body)
    request_body = json.loads(request.body)
    path_to_file = (
        str(settings.MEDIA_ROOT) +
        str(request_body['user']['id']) +
        '.txt'
    )
    with open(path_to_file, 'w') as f:
        f.write("")
    try:
        subscribers = Subscriber.objects.create(
            user_id=request_body['user']['id']
        )
    except IntegrityError:
        return Response({
            "response": "must be unique"
        })
    subscribers.subscribers.name = str(request_body['user']['id']) + '.txt'
    subscribers.save()
    return Response({
        "response": "success"
    })


@api_view(http_method_names=['PUT'])
@permission_classes([])
def add_subscriber(request):

    return Response({

    })
