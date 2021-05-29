from rest_framework import serializers
from .models import ChatMsg
class ChatMsgSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChatMsg
        fields = "__all__"
        extra_kwargs = {
            'sentTime': {'read_only': True},
            'sender': {'read_only': True},
        }
