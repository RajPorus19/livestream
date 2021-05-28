from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import ChatMsgSerializer
from .models import ChatMsg

class ChatMsgSet(viewsets.ModelViewSet):
    serializer_class =  ChatMsgSerializer
    queryset = ChatMsg.objects.all()
    permission_classes = [AllowAny]
