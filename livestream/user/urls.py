from .views import UserSet 
from django.urls import path

user_list = UserSet.as_view({'get':'list',
                               'post':'create'})
user_detail = UserSet.as_view({'put':'update',
                                 'get':'retrieve',
                                 'delete':'destroy'})
urlpatterns = [
        path("user/<int:pk>/",user_detail,name="user-detail"),
        path("user/",user_list,name="user-list"),
]
