# WE'LL MAKE OUR OWN User
# we'll add more fields afterwards

import json
from django.db import models

import bcrypt
import datetime

class User(models.Model):
    """
    saving the password and salt as BinaryFields because of this reason
    https://stackoverflow.com/questions/51052632/bcrypt-hash-returns-typeerrorunicode-objects-must-be-encoded-before-hashing
    """
    username = models.CharField(max_length=50, blank=False, unique=True)
    password = models.BinaryField(max_length = 250, blank=False)
    firstName = models.CharField(max_length=50, null = True, default='')
    lastName = models.CharField(max_length=50, null = True, default='')
    email = models.CharField(max_length=100, null = True, default="")
    salt = models.BinaryField(max_length=100, blank=False)
    created_on = models.DateTimeField(auto_now_add=True)
    profilePictureUrl = models.URLField(max_length=300, default='')
    channelBannerUrl = models.URLField(max_length=300, default='')
    likedVideos = models.TextField(default='{}') # going to be a dictionary
    likedComments = models.TextField(default='{}') # going to be a dictionary
    dislikedVideos = models.TextField(default='{}') # going to be a dictionary
    dislikedComments = models.TextField(default='{}') # going to be a dictionar
    subscribedTo=models.TextField(default='[]')
    def has_liked_video(self, video_id: int) -> bool:
        liked_videos = json.loads(self.likedVideos)
        return str(video_id) in liked_videos

    def has_disliked_video(self, video_id: int) -> bool:
        disliked_videos = json.loads(self.dislikedVideos)
        return str(video_id) in disliked_videos

    def has_liked_comment(self, comment_id: int) -> bool:
        liked_comments = json.loads(self.likedComments)
        return str(comment_id) in liked_comments

    def has_disliked_comment(self, comment_id: int) -> bool:
        disliked_comments = json.loads(self.dislikedComments)
        return str(comment_id) in disliked_comments

    

     
    def get_min_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "profilePictureUrl": self.profilePictureUrl,
        }

    def get_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "email": self.email,
            "subscribedTo":json.loads(self.subscribedTo),
            "created_on": str(self.created_on),
            "profilePictureUrl": self.profilePictureUrl,
            "channelBannerUrl": self.channelBannerUrl
        }
    
    # class Meta:
    #     app_label = 'accounts'

    def save(self, hash_password = False, *args, **kwargs):
        if hash_password:
            salt = bcrypt.gensalt() 
            
            self.password = bcrypt.hashpw(self.password.encode('utf-8'), salt)
            self.salt = salt

        super(User, self).save(*args, **kwargs)

    
    def __str__(self):
        return (
            f"username: {self.username}"
            f"firstName: {self.firstName}"
            f"lastName: {self.lastName}"
        )

# class ProfilePicture(models.Model):

#     created_on = models.DateTimeField(auto_now_add=True)
#     last_updated = models.DateTimeField()
#     user = models.ForeignKey(User, on_delete=models.CASCADE)

#     def get_dict(self):
#         return {
#             "profilePicture": self.profilePictureUrl,
#             "channelBanner": self.channelBannerUrl
#         }

#     def save(self, *args, **kwargs):
#         self.last_updated = datetime.datetime.now()
#         super(ProfilePicture, self).save(*args, **kwargs)


