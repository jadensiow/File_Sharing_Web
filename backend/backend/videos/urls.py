from django.urls import path

from .views import (
    change_video_thumbnail, create_channel, delete_video, dislike_comment, dislike_video, edit_video_details, 
    get_post_comments, get_video, home_page, channel_page, home_page_vid, 
    like_comment, like_video, make_dummy_data, video_upload,
    video_title_upload,delete_post_comments
)



urlpatterns = [
    path('<int:id>/', home_page),
    path('<int:id>/channel/', channel_page),
    path('<int:videoId>/upload/', video_upload), # upload of the rest 
    path('uploadTitle/', video_title_upload),
    path('channel/', create_channel),
    path('<int:id>/channel/', channel_page),
    path('watch/<int:videoId>/', get_video),
    path('comments/<int:commentId>/like/', like_comment),
    path('comments/<int:commentId>/dislike/', dislike_comment),
    path('<int:videoId>/comments/', get_post_comments),
    path('<int:videoId>/like/', like_video),
    path('<int:videoId>/dislike/', dislike_video),
    path('dummydata/', make_dummy_data),
    path('homepageVid/', home_page_vid),
    path('<int:videoId>/delete/', delete_video),
    path('<int:videoId>/edit/', edit_video_details),
    path('<int:videoId>/edit/thumbnail', change_video_thumbnail),
    path('comments/<int:commentId>/', delete_post_comments),
]