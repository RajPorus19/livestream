from rest_framework import routers
from .views import ChatMsgSet

router = routers.SimpleRouter()
router.register(r'chat', ChatMsgSet)
urlpatterns = router.urls
