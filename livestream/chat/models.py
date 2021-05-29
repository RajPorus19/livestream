from django.contrib.auth import get_user
from django.db import models
from django.contrib.auth.models import User

class ChatMsg(models.Model):
    message = models.CharField(max_length=300)
    sender  = models.ForeignKey(User,on_delete=models.CASCADE, to_field="username")
    sentTime = models.DateTimeField(auto_now_add=True, blank=True)
