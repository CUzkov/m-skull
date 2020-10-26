"""user models serializer classes"""

from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    """user serializer"""

    def create(self, validated_data):
        return get_user_model().objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.birthday = validated_data.get('birthday', instance.birthday)
        instance.status = validated_data.get('status', instance.status)
        # instance.likes = validated_data.get('likes', instance.likes)
        # instance.dislikes = validated_data.get('dislikes', instance.dislikes)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        return instance

    class Meta:
        model = get_user_model()
        exclude = [
            'user_permissions',
            'groups',
            'password',
            'id',
        ]
