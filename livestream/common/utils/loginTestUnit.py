from django.conf import settings
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

url = reverse("token_obtain_pair")


def login(client, user):
    if settings.USE_JWT:
        refresh = RefreshToken.for_user(user)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")
    else:
        client.force_login(user)
    return client
