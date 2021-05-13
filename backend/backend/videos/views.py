from django.db.models.query_utils import Q
from backend.helpers.delete import delete_from_s3
from django.urls import conf
from backend.config import Config
from django.http import HttpResponse
from django.core import serializers
import random
from backend.helpers.upload import upload_file
import random
import json
from accounts.models import User

from backend.utils import get_s3_key_from_s3_url, login_required, send_message
from .models import Comment, Video, Channel

from backend.helpers.upload import upload_file

# from .scripts import dummyData

def home_page(request, *args, **kwargs):
 return HttpResponse(
        json.dumps({"message": "home page"})
    )
    
@login_required
def get_user_data(request, *args, **kwargs):
    
    user = kwargs.get('user')        
    user_model = User.objects.filter(pk = user['id']).first()
    print("@@",user_model.subscribedTo)
    sub_chnl = []

    for userId in json.loads(user_model.subscribedTo):
        sub_chnl.append(
            Channel.objects.filter(user = userId).first().get_dict()
        )


    return HttpResponse(
        json.dumps({
            "success": True,
            "sub_chnl": sub_chnl,
            }),
    )

@login_required
def get_user_data2(request, *args, **kwargs):
    
    user = kwargs.get('user')            
    Channel_all_data = Channel.objects.all().exclude(pk = user['id']).order_by('?')[:5].only('channel_name','id')
    print('query',Channel_all_data)


    channel_json = serializers.serialize('json', Channel_all_data)

    return HttpResponse(
    
            channel_json,
            content_type="application/json"
            )

def channel_page(request, *args, **kwargs):

    user_id = kwargs['id']

    user_model_object = User.objects.filter(pk = user_id).first()
    
    if not user_model_object:
        return send_message(False, f"User with id {user_id} does not exist") 

    

    channel = Channel.objects.filter(user = user_model_object).first()
    
    if channel:
        obj_to_return = {}
        obj_to_return['user_id'] = user_id
        obj_to_return['channel_name'] = channel.channel_name
        obj_to_return['channel_description'] = channel.channel_description
        obj_to_return['subscribers'] = channel.subscribers

        all_videos = Video.objects.filter(user = user_model_object)

        videos_list = []

        for video in all_videos:
            v_obj = {**video.get_dict()}

            videos_list.append(v_obj)
        obj_to_return["videos"] = videos_list

    else:
        obj_to_return = {[]}

    return HttpResponse(
        json.dumps(obj_to_return),
        content_type = 'application/json'
    )



@login_required
def create_channel(request, *args, **kwargs):
    if request.method == 'POST':
        
        user = kwargs.get('user')
        user_model = User.objects.filter(pk = user['id']).first()
        channel_info = json.loads(request.body.decode('utf-8'))

        channel_name, channel_description = user_model.username, ''

        if channel_info.get('channel_name'):
            channel_name = channel_info.get('channel_name')

        if channel_info.get('channel_description'):
            channel_description = channel_info.get('channel_description')

        created_channel = Channel(
            channel_name = channel_name,
            channel_description = channel_description,
            user = user_model
        )

        created_channel.save()
        return HttpResponse(
            json.dumps({
                "success": True,
                "message": "Channel created"
            })
        )
@login_required
def video_upload(request, *args, **kwargs):
    if request.method == 'POST':
        user = kwargs.get('user')
        video_id = kwargs.get('videoId')


        user_model = User.objects.filter(pk = user['id']).first()

        file_to_upload1 = request.FILES.get('myVid')
        file_to_upload2 = request.FILES.get('myThumbnail')

        try:
            s3_url1 = upload_file(file_to_upload1, user_model.username)
            s3_url2 = upload_file(file_to_upload2, user_model.username)
            print("s3",s3_url1)
        except:
            return send_message(False, "Sorry something went wrong")
        
        video_data = Video.objects.filter(pk = video_id, user = user_model).first()
        
        if video_data:
            video_data.videoUrl = s3_url1

            video_data.videoThumbnailUrl=s3_url2
    
            video_data.save()

        return HttpResponse(
            json.dumps({
                    "success": True,
                    "message": "File Uploaded Successfully",
                    "videoUrl": video_data.videoUrl,
                    "videoThumbnailUrl": video_data.videoThumbnailUrl,



                })
        ) 

@login_required
def video_title_upload(request, *args, **kwargs):
    if request.method == 'POST':
        user = kwargs.get('user')
        print("@@@videotitle",kwargs)
        print("@@@videotitle2",args)

        video_data = json.loads(request.body.decode('utf-8'))
        user_model = User.objects.filter(pk = user['id']).first()
  
        if video_data.get('title'):
            title = video_data.get('title')

        if video_data.get('description'):
            description = video_data.get('description')

        created_video = Video (
            title = title,
            description = description,
            user = user_model
        )
        created_video.save()
        

        return  HttpResponse (
            json.dumps({
                'success': True,
                'message': 'title and description uploaded',
                "videoId": created_video.id
            })
        ) 
        
def get_video(request, **kwargs):
    video_id = kwargs.get('videoId')

    video_model = Video.objects.filter(pk = video_id).first()
    if not video_model:
        return send_message(False, "Video not found")

    video_comments = Comment.objects.filter(video = video_model).order_by('-commented_on')

    #print(f"\n\n {request.GET} \n\n")

    user_id = request.GET.get('userId')

    obj_to_return = {
        'video': {},
        'comments': [],
    }

    obj_to_return['video'] = video_model.get_dict()

    user_model = None

    if user_id is not None:
        user_model = User.objects.filter(pk = int(user_id)).first()
        obj_to_return['video']['userLikesVideo'] = user_model.has_liked_video(int(video_id))
        obj_to_return['video']['userDislikesVideo'] = user_model.has_disliked_video(int(video_id))

    for comment in video_comments:
        comment_dict = comment.get_dict()

        if user_model:
            comment_dict['userLikesComment'] = user_model.has_liked_comment(comment.id)
            comment_dict['userDislikesComment'] = user_model.has_disliked_comment(comment.id)
        
        else:
            comment_dict['userLikesComment'] = False
            comment_dict['userDislikesComment'] = False

        obj_to_return['comments'].append(comment_dict)

    obj_to_return['success'] = True

    return HttpResponse(
        json.dumps(obj_to_return),
        content_type='application/json'
    )

@login_required
def get_post_comments(request, **kwargs):
    if request.method == 'POST':
        user = kwargs.get('user')
        video_id = kwargs.get('videoId')
        body = json.loads(request.body.decode())

        user_model = User.objects.filter(pk = user['id']).first()
        video_model = Video.objects.filter(pk = video_id).first()

        if not user_model or not video_model:
            return send_message(False, "Either user of video not found")

        try:
            new_comment = Comment(
                comment = body.get('comment'),
                user = user_model,
                video = video_model
            )

            new_comment.save()

        except Exception as e:
            return send_message(False, "Something went wrong while saving the comment")

        return HttpResponse(
            json.dumps({
                'success': True,
                "comment": new_comment.get_dict()
            })
        )

@login_required
def delete_video(request, **kwargs):
    if request.method != 'DELETE':
        return send_message(False, f"{request.method} not supported on this route")

    video_id = kwargs.get('videoId')
    user = kwargs.get('user')

    user_model = User.objects.filter(pk = user['id']).first()
    video_model = Video.objects.filter(pk = video_id).first()

    if video_model.user.id != user_model.id:
        return send_message(False, "You can only delete your own videos")

    video_s3_urls = [video_model.videoUrl, video_model.videoThumbnailUrl]

    video_s3_keys = get_s3_key_from_s3_url(video_s3_urls)

    try:
        delete_from_s3(video_s3_keys)

    except:
        return send_message(False, "Something went wrong while deleting the video")

    video_model.delete()
    
    return send_message(True, "Video Deleted")

@login_required
def edit_video_details(request, **kwargs):
    if request.method != 'PUT':
        return send_message(False, f"{request.method} not supported on this route")
    
    body = json.loads(request.body.decode())

    user = kwargs.get('user')
    video_id = kwargs.get('videoId')

    user_model = User.objects.filter(pk = user['id']).first()
    video_model = Video.objects.filter(pk = video_id).first()

    if video_model.user.id != user_model.id:
        return send_message(False, "You can only edit your own videos")

    new_title = body.get('title')
    new_description = body.get('description')

    if new_title:
        video_model.title = new_title

    if new_description:
        video_model.description = new_description

    video_model.save()

    return HttpResponse(json.dumps({
        "success": True,
        "message":"Video details edited Successfully",
        "video": video_model.get_dict()
    }))

@login_required
def change_video_thumbnail(request, **kwargs):
    if request.method != 'POST':
        return send_message(False, f"{request.method} not supported on this route")

    user = kwargs.get('user')
    video_id = kwargs.get('videoId')

    user_model = User.objects.filter(pk = user['id']).first()
    video_model = Video.objects.filter(pk = video_id).first()

    if video_model.user.id != user_model.id:
        return send_message(False, "You can only edit your own videos")

    new_thumbnail = request.FILES.get('newThumbnail')

    print(f'\n\n file = {new_thumbnail}, files = {request.FILES} \n\n')

    try:
        new_thumbnail_s3_url = upload_file(new_thumbnail, user_model.username)

    except Exception as e:
        print(f'\n\n Exception = {e} \n\n')
        return send_message(False, "Something went wrong while uploading the thumbnail")

    urls = get_s3_key_from_s3_url([video_model.videoThumbnailUrl])

    delete_from_s3(urls)

    video_model.videoThumbnailUrl = new_thumbnail_s3_url
    video_model.save()

    return HttpResponse(json.dumps({
        "success": True,
        "message": "Successfully uploaded the new thumbnail",
        "video": video_model.get_dict()
    }))

    
def search_videos_channels(request, **kwargs):
    search_for = request.GET.get('searchFor')
    search_query = request.GET.get('searchQuery')

    if len(search_for) == 0 or len(search_query) == 0:
        send_message(False, "Search Query cannot be empty")
    
    print('\n\nrequest.GET = ', search_for, search_query)

    list_to_return = []
    search_for = search_for.lower()

    if search_for == 'videos':
        videos = Video.objects.filter(
            Q(title__icontains = search_query) |
            Q(description__icontains = search_query)
        )

        if videos:
            for v in videos:
                list_to_return.append(v.get_dict())

        else:
            return send_message(False, "Sorry nothing found")

    elif search_for == 'channels':
        channels = Channel.objects.filter(
            Q(channel_name__icontains = search_query) |
            Q(channel_description__icontains = search_query)
        )

        if channels:
            for c in channels:
                list_to_return.append(c.get_dict())

        else:
            return send_message(False, "Sorry nothing found")

    else:
        return send_message(False, "Invalid Search")

    return HttpResponse(json.dumps({
        "results": list_to_return,
        "success": True
    }))

@login_required
def like_video(request, **kwargs):
    if request.method == 'POST':
        str_to_return = ""
        like_adder = 0
        dislike_adder = 0
        user_likes_video = False
        user_dislikes_video = False

        user = kwargs.get('user')
        print("@@@",kwargs)

        video_id = kwargs.get('videoId')

        user_model = User.objects.filter(pk = user['id']).first()
        video_model = Video.objects.filter(pk = video_id).first()

        video_model_d = video_model.dislikes
        video_model_l = video_model.likes

        disliked_videos = json.loads(user_model.dislikedVideos)
        liked_videos = json.loads(user_model.likedVideos)

        if str(video_id) in disliked_videos:
            # if user likes it then remove any dislikes he may have had
            del disliked_videos[str(video_id)]
            user_model.dislikedVideos = json.dumps(disliked_videos)
            
            dislike_adder = -1
            video_model_d -= 1


        if str(video_id) in liked_videos:
            # unlike the video
            str_to_return = 'Video Unliked'
            del liked_videos[str(video_id)]

            video_model_l -= 1
            like_adder = -1

        else:
            # add video to liked videos
            str_to_return = 'Video Liked'
            liked_videos[str(video_id)] = True

            user_likes_video = True
            video_model_l += 1
            like_adder = 1

        user_model.likedVideos = json.dumps(liked_videos)
        user_model.save()

        video_model.likes = video_model_l
        video_model.dislikes = video_model_d

        video_model.save()

        return HttpResponse(json.dumps({
            "success": True,
            "like_adder": like_adder,
            "dislike_adder": dislike_adder,
            "user_likes_video": user_likes_video,
            "user_dislikes_video": user_dislikes_video,
            "message": str_to_return
        }))

@login_required
def dislike_video(request, **kwargs):
    if request.method == 'POST':
        str_to_return = ''
        like_adder = 0
        dislike_adder = 0
        user_likes_video = False
        user_dislikes_video = False

        user = kwargs.get('user')

        video_id = kwargs.get('videoId')

        user_model = User.objects.filter(pk = user['id']).first()
        video_model = Video.objects.filter(pk = video_id).first()

        video_model_d = video_model.dislikes
        video_model_l = video_model.likes

        disliked_videos = json.loads(user_model.dislikedVideos)
        liked_videos = json.loads(user_model.likedVideos)

        if str(video_id) in liked_videos:
            # if user dislikes it then remove any likes he may have had
            del liked_videos[str(video_id)]
            user_model.likedVideos = json.dumps(liked_videos)

            like_adder = -1
            video_model_l -= 1


        if str(video_id) in disliked_videos:
            # undislike the video
            str_to_return = "Video Un-disliked"
            del disliked_videos[str(video_id)]

            dislike_adder = -1
            video_model_d -= 1
        else:
            # add video to disliked videos
            str_to_return = "Video Disliked"
            disliked_videos[str(video_id)] = True

            dislike_adder = 1
            user_dislikes_video = True
            video_model_d += 1

        user_model.dislikedVideos = json.dumps(disliked_videos)
        user_model.save()

        video_model.likes = video_model_l
        video_model.dislikes = video_model_d

        video_model.save()

        return HttpResponse(json.dumps({
            "success": True,
            "like_adder": like_adder,
            "dislike_adder": dislike_adder,
            "user_likes_video": user_likes_video,
            "user_dislikes_video": user_dislikes_video,
            "message": str_to_return
        }))


@login_required
def like_comment(request, **kwargs):
    if request.method == 'POST':
        str_to_return = ""
        like_adder = 0
        dislike_adder = 0
        user_likes_comment = False
        user_dislikes_comment = False


        user = kwargs.get('user')

        comment_id = kwargs.get('commentId')

        user_model = User.objects.filter(pk = user['id']).first()
        comment_model = Comment.objects.filter(pk = comment_id).first()

        comment_model_d = comment_model.dislikes
        comment_model_l = comment_model.likes

        disliked_comments = json.loads(user_model.dislikedComments)
        liked_comments = json.loads(user_model.likedComments)

        if str(comment_id) in disliked_comments:
            # if user likes it then remove any dislikes he may have had
            del disliked_comments[str(comment_id)]
            user_model.dislikedComments = json.dumps(disliked_comments)

            dislike_adder = -1
            comment_model_d -= 1


        if str(comment_id) in liked_comments:
            # unlike the comment
            str_to_return = 'Comment Unliked'
            del liked_comments[str(comment_id)]

            like_adder = -1
            comment_model_l -= 1
        else:
            # add comment to liked commentss
            str_to_return = 'Comment Liked'
            liked_comments[str(comment_id)] = True
            user_likes_comment = True
            like_adder = 1
            comment_model_l += 1

        user_model.likedComments = json.dumps(liked_comments)
        user_model.save()

        comment_model.likes = comment_model_l
        comment_model.dislikes = comment_model_d

        comment_model.save()

        return HttpResponse(json.dumps({
            "success": True,
            "like_adder": like_adder,
            "dislike_adder": dislike_adder,
            "user_likes_comment": user_likes_comment,
            "user_dislikes_comment": user_dislikes_comment,
            "message": str_to_return
        }))


@login_required
def dislike_comment(request, **kwargs):
    if request.method == 'POST':
        str_to_return = ""
        like_adder = 0
        dislike_adder = 0
        user_likes_comment = False
        user_dislikes_comment = False

        user = kwargs.get('user')

        comment_id = kwargs.get('commentId')

        user_model = User.objects.filter(pk = user['id']).first()
        comment_model = Comment.objects.filter(pk = comment_id).first()

        comment_model_d = comment_model.dislikes
        comment_model_l = comment_model.likes

        disliked_comments = json.loads(user_model.dislikedComments)
        liked_comments = json.loads(user_model.likedComments)

        if str(comment_id) in liked_comments:
            # if user likes it then remove any likes he may have had
            del liked_comments[str(comment_id)]
            user_model.likedComments = json.dumps(liked_comments)

            like_adder = -1
            comment_model_l -= 1


        if str(comment_id) in disliked_comments:
            # un-dislike the comment
            str_to_return = 'Comment Un-disliked'
            del disliked_comments[str(comment_id)]
            dislike_adder = -1
            comment_model_d -= 1
        else:
            # add comment to disliked commentss
            str_to_return = 'Comment Disiked'
            disliked_comments[str(comment_id)] = True

            dislike_adder = 1
            user_dislikes_comment = True
            comment_model_d += 1

        user_model.dislikedComments = json.dumps(disliked_comments)
        user_model.save()

        comment_model.likes = comment_model_l
        comment_model.dislikes = comment_model_d

        comment_model.save()

        return HttpResponse(json.dumps({
            "success": True,
            "like_adder": like_adder,
            "dislike_adder": dislike_adder,
            "user_likes_comment": user_likes_comment,
            "user_dislikes_comment": user_dislikes_comment,
            "message": str_to_return
        }))

@login_required
def delete_post_comments(request, **kwargs):
    if request.method == 'DELETE':

        comment_id = kwargs.get('commentId')

        new_comment = Comment.objects.filter(pk = comment_id).delete()



        return HttpResponse(
            json.dumps({
                'success': True,

            })
        )

@login_required
def edit_post_comments(request, **kwargs):
    if request.method != 'PUT':
        return send_message(False, f"{request.method} not supported on this route")
    
    # body = (request.body.decode())
    # print(type(body))
    # print("@@BODY@a@", body)
    print(f"\n\n {request.body} \n\n")
    
    body = json.loads(request.body.decode())
    
    
    new_comment = body.get('newComment')
    
    if not new_comment:
        return send_message(False, "Bad request. No comment found")
    
    user = kwargs.get('user')
    comment_Id = kwargs.get('commentId')
    user_model = User.objects.filter(pk = user['id']).first()
    
    # sorry again for this. keep forgetting the .first()

    
    comment_model = Comment.objects.filter(pk = comment_Id, user = user_model).first()

    if not comment_model:
        return send_message(False, "Sorry no comment found in database with that id")
    
    comment_model.comment = new_comment
    
    # print('comment',comment_model)

    comment_model.save()

    return HttpResponse(json.dumps({
        "success": True,
        "message":"Comment details edited Successfully",
        "comment": comment_model.get_dict()
    }))
    
    
def home_page_vid(request, *args, **kwargs):
    video_all_data = Video.objects.all().order_by('-views')[:20]
        
    home_page_video = []
    obj_to_return = {}

    for video in video_all_data:
        v_obj = video.get_dict()

        home_page_video.append(v_obj)
        
    obj_to_return["homepageInfo"] = home_page_video
    return HttpResponse(
        json.dumps(obj_to_return),
        content_type = 'application/json'
    )

     
# import random
# from videos.models import Video

# def random_views():
#         vs = Video.objects.all()
        
#         for v in vs:
#                 if v.videoUrl and len(v.videoUrl) > 0:
#                         v.views = random.randint(100, 100000)
#                 v.save()

@login_required
def subscribed_to(request, *args, **kwargs):
    if request.method == 'POST':
        user = kwargs.get('user')
        channel_Id=kwargs.get("channelId")
        user_model = User.objects.filter(pk = user['id']).first()
        
        l = json.loads(user_model.subscribedTo)
        
        l.append(channel_Id)
        user_model.subscribedTo = json.dumps(l)

        user_model.save()
        print('usermodel', user_model)

    return HttpResponse(
        json.dumps({
            "success": True,
            "profileInfo":user_model.get_dict()
      
        }), 
        content_type="text/json-comment-filtered"
    )

@login_required
def delete_subscribed_to(request, **kwargs):
    if request.method == 'DELETE':

        delete_channel_id = kwargs.get('channelId')
        user = kwargs.get('user')
        user_model = User.objects.filter(pk = user['id']).first()
        sub_to = json.loads(user_model.subscribedTo)
        idx = sub_to.index(delete_channel_id)
        sub_to = sub_to[:idx] + sub_to[idx + 1:]
        user_model.subscribedTo=json.dumps(sub_to)
        user_model.save()
        print('usermodel', user_model)


        return HttpResponse(
            json.dumps({
                'success': True,
                "profileInfo":user_model.get_dict()

            })
        )
@login_required
def add_sub_count(request, *args, **kwargs):
    if request.method == 'PUT':
        channel_Id=kwargs.get("channelId")
        channel_model = Channel.objects.filter(pk = channel_Id).first()
        
        channel_model.subscribers+=1
        channel_model.save()
        print('usermodel', channel_model)
 
    return HttpResponse(
        json.dumps({
            "success": True,
            "channelInfo":channel_model.get_dict()
      
        }), 
        content_type="text/json-comment-filtered"
    )
    
@login_required
def minus_sub_count(request, *args, **kwargs):
    if request.method == 'PUT':
        channel_Id=kwargs.get("channelId")
        channel_model = Channel.objects.filter(pk = channel_Id).first()
        
        channel_model.subscribers-=1
        channel_model.save()
        print('usermodel', channel_model)
 
    return HttpResponse(
        json.dumps({
            "success": True,
            "channelInfo":channel_model.get_dict()
      
        }), 
        content_type="text/json-comment-filtered"
    )

@login_required
def add_view_count(request, *args, **kwargs):

    if request.method != 'PUT':
        return send_message(False, f"{request.method} not supported on this route")


    video_Id=kwargs.get("videoId")
    video_model = Video.objects.filter(pk = video_Id).first()
    video_model.views+=1
        
    user = kwargs.get('user')
    user_id=user['id']
    print('user',user)
    viewers_json = json.loads(video_model.viewers)

    viewers_json.append(user_id)
    video_model.viewers = json.dumps(viewers_json)
        

    
    

    video_model.save()
        
 
    return HttpResponse(
        json.dumps({
            "success": True,
            "watchVideo":video_model.get_dict()
      
        }), 
        content_type="text/json-comment-filtered"
    )


def make_dummy_data(request):
    f = open('/media/pragyan/Local Disk/Python/Youtube_Clone_React_Django/backend/videos/text.txt', 'r')
    dummy_comments = f.readlines()
    f.close()

    desc = """
    Nullam vehicula ipsum a arcu cursus. Eget velit aliquet sagittis id consectetur purus. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis. Risus commodo viverra maecenas accumsan lacus vel facilisis. Arcu dictum varius duis at. Pellentesque dignissim enim sit amet venenatis urna cursus. Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Suspendisse in est ante in nibh. Facilisi nullam vehicula ipsum a arcu cursus vitae. Elit sed vulputate mi sit amet mauris. Velit dignissim sodales ut eu. Dictum sit amet justo donec enim. Pharetra sit amet aliquam id. Orci ac auctor augue mauris augue neque gravida in fermentum. Tincidunt vitae semper quis lectus nulla at volutpat. Sapien eget mi proin sed. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Nisi scelerisque eu ultrices vitae auctor eu. Maecenas pharetra convallis posuere morbi leo urna molestie. Vel pharetra vel turpis nunc eget lorem dolor sed viverra.
    """

    v_names = [
        "Monster", 'Berserk', "Legend of the Galactic Heroes", "Mushishi",
        "Honey and Clover", "Shoujo kakumei Utena", "Mawaru Penguindrum",
        "Pluto", "Billy Bat", "Vagabond", "20th Century Boys"
    ]

    user = User.objects.filter(username = 'johan').first()

    for i in v_names:
        vid = Video(
            title = i,
            description = desc[:random.randint(0, len(desc))],
            likes = random.randint(0, 10000),
            dislikes = random.randint(0, 10000),
            views = random.randint(0, 1000000),
            user = user
        )

        vid.save()

        for j in range(15):
            c = Comment(
                comment = dummy_comments[random.randint(0, len(dummy_comments) - 1)],
                likes = random.randint(0, 100),
                dislikes = random.randint(0, 100),
                user = user,
                video = vid
            )

            c.save()

    return HttpResponse(
        json.dumps({"message": "done"})
    )


