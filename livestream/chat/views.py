from django.contrib.auth import get_user_model
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import ChatMsgSerializer
from .models import ChatMsg

class ChatMsgSet(viewsets.ModelViewSet):
    serializer_class =  ChatMsgSerializer
    queryset = ChatMsg.objects.all()
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.request.method in ["PUT","DELETE"]:
            return ChatMsg.objects.for_user(self.request.user).all()
        return ChatMsg.objects.all()

    def create(self, *args, **kwargs):
        newMsg = ChatMsg.objects.create(
                message=self.request.data["message"],
                sender=self.request.user)
        serializedMessage = ChatMsgSerializer(newMsg)
        return Response(serializedMessage.data,status=status.HTTP_201_CREATED)
