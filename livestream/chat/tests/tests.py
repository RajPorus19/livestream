import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

class ChatTestCreation(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username='username',
            email='email@mail.com',
            password='password')
        self.client = Client()
        self.chatMsgUrl = reverse('chatmsg-list')
        self.data = {
            "message": "Hello world!",
        }
    def test_msg_creation(self):
        self.client.force_login(user=self.user)
        response = self.client.post(self.chatMsgUrl, json.dumps(self.data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
