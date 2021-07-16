from rest_framework import viewsets
from .serializers import UserSerializer 
from django.contrib.auth import get_user_model
from rest_framework.response import Response

class UserSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()

    def create(self, args, **kwargs):
        user = get_user_model().objects.create_user(**self.request.data)
        return Response(data=UserSerializer(user))
