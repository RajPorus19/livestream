from rest_framework import viewsets
from .serializers import UserSerializer 
from django.contrib.auth import get_user_model

class UserSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()
