from rest_framework import serializers
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"
        extra_kwargs = {
            'password': {'write_only': True},
            'last_login': {'read_only': True},
            'date_joined': {'read_only': True},
            "is_superuser": {'read_only': True},
            "is_staff": {'read_only': True},
            "is_active": {'read_only': True},
            "date_joined": {'read_only': True},
            "groups": {'read_only': True},
            "user_permissions": {'read_only': True},
        }
