from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import (
#     IsAdminUser,
#     IsAuthenticatedOrReadOnly,
#     IsAuthenticated
# )
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Moment
from .serializers import MomentSerializer
# import json
# from json import JSONDecodeError


@api_view(http_method_names=['GET'])
@permission_classes([])
def get_all_posts(request):
    paginator = PageNumberPagination()
    moments = Moment.objects.all().order_by('id')
    context = paginator.paginate_queryset(moments, request)
    serializers_moments = MomentSerializer(context, many=True)
    return paginator.get_paginated_response(serializers_moments.data)


@api_view(http_method_names=['GET'])
@permission_classes([])
def get_user_posts(request, id=1):
    paginator = PageNumberPagination()
    moments = Moment.objects.filter(id=id).order_by('id')
    context = paginator.paginate_queryset(moments, request)
    serializers_moments = MomentSerializer(context, many=True)
    return paginator.get_paginated_response(serializers_moments.data)


@api_view(http_method_names=['GET'])
@permission_classes([])
def get_user_tape(request):

    return Response({

    })
