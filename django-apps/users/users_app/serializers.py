"""user models serializer classes"""

from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """user serializer"""

    def create(self, validated_data):
        user_obj = User(
            email=validated_data['email'],
            password=validated_data['password'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user_obj.set_password(validated_data['password'])
        user_obj.save()
        return validated_data

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
        ]
