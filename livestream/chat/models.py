from django.contrib.auth import get_user
from django.db import models
from django.contrib.auth.models import User

class ChatMsgManager(models.Manager):
    def for_user(self, user):
        if user.is_superuser or user.is_staff:
            return super().get_queryset()
        else:
            return super().get_queryset().filter(sender=user)

class ChatMsg(models.Model):
    objects = ChatMsgManager()
    message = models.CharField(max_length=300)
    sender  = models.ForeignKey(User,on_delete=models.CASCADE, to_field="username")
    sentTime = models.DateTimeField(auto_now_add=True, blank=True)

    def is_staff(self):
       return self.sender.is_staff
        
    def is_superuser(self):
       return self.sender.is_superuser
