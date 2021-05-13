from accounts.models import User
from django.db import models
import json


# Create your models here.

class Video(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField(max_length=300)
    uploaded_on = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0, null = True)
    dislikes = models.IntegerField(default=0, null = True)
    views = models.IntegerField(default=0)
    videoUrl = models.URLField(max_length=300, default='')
    videoThumbnailUrl = models.URLField(max_length=300, default='')
    viewers=models.TextField(default='[]')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def put_commas(self, property) -> str:
        new = ''
        old = str(property)

        for (i, e) in enumerate(old[::-1]):
            to_add = '' if (i + 1) % 3 != 0 else ','
            new += e + to_add

        return new[::-1] if len(old) % 3 != 0 else new[::-1][1:]
  

    def get_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "uploaded_on": str(self.uploaded_on),
            "likes": self.likes,
            "dislikes": self.dislikes,
            "views": self.put_commas(self.views),
            "videoUrl": self.videoUrl,
            "viewers":json.loads(self.viewers),

            "videoThumbnailUrl": self.videoThumbnailUrl,
            "user": self.user.get_dict(),
        }

    def __str__(self):
        return self.title

    
class Comment(models.Model):
    comment = models.TextField(max_length=300)
    commented_on = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)

    def get_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "commented_on": str(self.commented_on),
            "likes": self.likes,
            "dislikes": self.dislikes,
            "user": self.user.get_min_dict()
        }

    def __str__(self):
        return self.text


class Channel(models.Model):
    channel_name = models.CharField(max_length=50, blank=False, null=False)
    channel_description = models.TextField(null=True, default='')
    channel_picture = models.URLField(max_length = 300)
    subscribers = models.IntegerField(default=0, blank=False, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def get_dict(self): 
        return {
            "id": self.id,
            "channel_name": self.channel_name,
            "channel_description": self.channel_description,
            "subscribers": self.subscribers,
            "user": self.user.get_dict()
        }
