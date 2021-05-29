from .views import ChatMsgSet
from django.urls import path

msg_list = ChatMsgSet.as_view({'get':'list',
                               'post':'create'})
msg_detail = ChatMsgSet.as_view({'put':'update',
                                 'get':'retrieve',
                                 'delete':'destroy'})
urlpatterns = [
        path("chat/<int:pk>/",msg_detail,name="chatmsg-detail"),
        path("chat/",msg_list,name="chatmsg-list"),
]
