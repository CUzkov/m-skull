from rest_framework import serializers
from .models import Moment

class MomentSerializer(serializers.Serializer):

    class Meta:
        model = Moment
        fields = '__all__'