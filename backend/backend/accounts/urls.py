from django.urls import path
# from .views import main
from .views import get_all_users, get_user_profile_by_id, user_login, user_register, profile_pic_upload
urlpatterns=[
    path("", get_all_users),
    path("login/", user_login),
    path("register/", user_register),
    path("<int:id>/profile/", get_user_profile_by_id),
    path("upload/profilepicture/", profile_pic_upload),
]
