"""user models serializer classes"""

from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    """user serializer"""

    def create(self, validated_data):
        return get_user_model().objects.create(**validated_data)

    class Meta:
        model = get_user_model()
        exclude = [
            'groups',
            'user_permissions',
            'dislikes_user_id',
            'likes_user_id',
            'is_active',
            'is_staff',
            'is_superuser',
            'password'
        ]
