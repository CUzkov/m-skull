from rest_framework import serializers
from .models import Moment


class MomentSerializer(serializers.ModelSerializer):
    """moments serializer class"""

    class Meta:
        model = Moment
        fields = '__all__'
