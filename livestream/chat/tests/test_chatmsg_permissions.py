import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from chat.models import ChatMsg


class ChatTestUpdateReadDeletePermissions(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username='username',
            email='email@mail.com',
            password='password')
        self.otheruser = get_user_model().objects.create(
            username='otherusername',
            email='otheremail@mail.com',
            password='otherpassword')
        self.staff = get_user_model().objects.create(
            username='staff',
            email='staff@mail.com',
            password='staff',is_staff=True)
        self.client = Client()
        self.message = ChatMsg.objects.create(message="my message"
                               ,sender=self.user)
        self.chatMsgUrlDetail = reverse(
            "chatmsg-detail",kwargs={"pk":self.message.id})
        self.chatMsgUrlList = reverse('chatmsg-list')
        self.data = {
            "message": "Hello world!",
        }
    def test_msg_update_from_user(self):
        self.client.force_login(user=self.user)
        response = self.client.put(self.chatMsgUrlDetail, 
                                    json.dumps(self.data), 
                                    content_type="application/json")

        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.json()["message"],self.data["message"])
        self.assertEqual(response.json()["sender"],self.user.username)

    def test_msg_update_from_otheruser(self):
        self.client.force_login(user=self.otheruser)
        response = self.client.put(self.chatMsgUrlDetail, 
                                    json.dumps(self.data), 
                                    content_type="application/json")
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

    def test_msg_update_from_staff(self):
        self.client.force_login(user=self.staff)
        response = self.client.put(self.chatMsgUrlDetail, 
                                    json.dumps(self.data), 
                                    content_type="application/json")
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.json()["message"],self.data["message"])
        self.assertEqual(response.json()["sender"],self.user.username)

    def test_msg_retrieve_from_user(self):
        self.client.force_login(user=self.user)
        response = self.client.get(self.chatMsgUrlDetail)

        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.json()["message"],self.message.message)
        self.assertEqual(response.json()["sender"],self.user.username)

    def test_msg_retrieve_from_otheruser(self):
        self.client.force_login(user=self.otheruser)
        response = self.client.get(self.chatMsgUrlDetail)

        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.json()["message"],self.message.message)
        self.assertEqual(response.json()["sender"],self.user.username)

    def test_msg_retrieve_from_staff(self):
        self.client.force_login(user=self.staff)
        response = self.client.get(self.chatMsgUrlDetail)

        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.json()["message"],self.message.message)
        self.assertEqual(response.json()["sender"],self.user.username)

    def test_msg_delete_from_user(self): 
        self.client.force_login(user=self.user)
        response = self.client.delete(self.chatMsgUrlDetail)
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)

        # retrieve
        response = self.client.get(self.chatMsgUrlDetail)
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
        # get list
        response = self.client.get(self.chatMsgUrlList)
        self.assertEqual(len(response.json()),0)
    def test_msg_delete_from_otheruser(self):
        self.client.force_login(user=self.otheruser)
        response = self.client.delete(self.chatMsgUrlDetail)
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

        # retrieve
        response = self.client.get(self.chatMsgUrlDetail)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        # get list
        response = self.client.get(self.chatMsgUrlList)
        self.assertEqual(len(response.json()),1)

    def test_msg_delete_from_staff(self): 
        self.client.force_login(user=self.staff)
        response = self.client.delete(self.chatMsgUrlDetail)
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)

        # retrieve
        response = self.client.get(self.chatMsgUrlDetail)
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
        # get list
        response = self.client.get(self.chatMsgUrlList)
        self.assertEqual(len(response.json()),0)

    def test_msg_list_from_user(self):
        self.client.force_login(user=self.user)
        response = self.client.get(self.chatMsgUrlList)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.json()),1)
        self.assertEqual(response.json()[0]["message"],self.message.message)
        self.assertEqual(response.json()[0]["sender"],self.user.username)

    def test_msg_list_from_otheruser(self):
        self.client.force_login(user=self.otheruser)
        response = self.client.get(self.chatMsgUrlList)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.json()),1)
        self.assertEqual(response.json()[0]["message"],self.message.message)
        self.assertEqual(response.json()[0]["sender"],self.user.username)

    def test_msg_list_from_staff(self):
        self.client.force_login(user=self.staff)
        response = self.client.get(self.chatMsgUrlList)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.json()),1)
        self.assertEqual(response.json()[0]["message"],self.message.message)
        self.assertEqual(response.json()[0]["sender"],self.user.username)
