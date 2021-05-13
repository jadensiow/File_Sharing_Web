# from django.contrib.auth.models import User
from backend.helpers.upload import upload_file
from backend.utils import login_required, send_message
from django.core import serializers
from django.http import HttpResponse

import json
import jwt
import bcrypt

from .models import User
from backend.config import Config

# json.dumps = JSON.stringify
# json.loads = JSON.parse
# express stringify but for this is not thus need  to do json.dumps


def get_all_users(request) -> HttpResponse:
    if request.method == 'GET':
        users: User = User.objects.all()
        users_list = serializers.serialize('json', users)
        return HttpResponse(users_list, content_type="text/json-comment-filtered")

def user_register(request) -> HttpResponse:
    # request.body is a bytes string so convert it to utf-8
    body = request.body.decode('utf-8')
    data: dict = json.loads(body)

    if not data.get('username') or not data.get('password'):
        return send_message(False, "Either username or password not present. User creation failed")

    user_exists = User.objects.filter(username = data.get('username')).first()

    if user_exists:
        return send_message(False, f"Username '{user_exists.username}' is taken")

    user = User(
        username = data.get('username'), 
        password = data.get('password'),
        firstName = data.get('firstName'),
        lastName = data.get('lastName'),
        email = data.get('email')
    )
    user.save(hash_password=True)

    return send_message(True, "User Created successfully")


def get_user_profile_by_id(request, *args, **kwargs) -> HttpResponse:
    user_id: int = kwargs['id']

    user_model: User = User.objects.filter(pk = user_id).first()

    if not user_model:
        return send_message(False, f"User with id '{user_id}' not found")
    
    response = user_model.get_dict()
    

    return HttpResponse(
        json.dumps({
            "success": True,
            'profileInfo': response
        }), 
        content_type="text/json-comment-filtered"
    )

def user_login(request) -> HttpResponse:
    if request.method!='POST':
        return HttpResponse(
            json.dumps({
                "success": False,
                "message":  f"{request.method} not allowed on this route"
            }),
            content_type="application/json",
        )

    data=json.loads(request.body.decode('utf-8'))
    if not data.get('username') or not data.get('password'):
        return send_message(False, "Either username or password not present. Login failed")

    username: str = data['username']
    password: str = data['password']
    
    user: User = User.objects.filter(username=username).first()
    
    if not user:
        return send_message(False, f"User with username '{username}' not found")
    
    '''
    take the user input password and hash it with the same salt use used to 
    hash the original password. Then we compare hashes to see if they're equal
    '''
    password_new = password.encode('utf-8')
    hashed_input_password: bytes = bcrypt.hashpw(password_new, user.salt.tobytes())

    if not hashed_input_password == user.password.tobytes():
        return send_message(False, 'Invalid Password')

    jw_token = jwt.encode(
        { 'username':user.username, 'id':user.pk },
        key=Config.JWT_SECRET,
        algorithm=Config.JWT_HASH_ALGO
    )
    
    return HttpResponse(
        json.dumps({
            'success': True,
            'token': jw_token,
            "user": user.get_dict()
        }),
        status = 200
    )
    
@login_required
def profile_pic_upload(request, *args, **kwargs):
    if request.method == 'POST':
        user = kwargs.get('user')

        user_model = User.objects.filter(pk = user['id']).first()
        file_to_upload = request.FILES.get('myFile')
        
        # picture_type can be either profilePicture or channelBanner
        picture_type = request.GET.get('pictureType')

        if not picture_type:
            return send_message(False, "Bad Request")


        try:
            s3_url = upload_file(file_to_upload, user_model.username)

            if picture_type == 'profilePicture':
                user_model.profilePictureUrl = s3_url

            elif picture_type == 'channelBanner':
                user_model.channelBannerUrl = s3_url

            user_model.save()

        except:
            return send_message(False, "Sorry something went wrong while uploading the file")

        return send_message(True, "It might take some time for the change to show up")


@login_required
def edit_profile_info(request, **kwargs):
    user = kwargs.get('user')
    user_id = kwargs.get('userId')

    if not user['id'] == user_id:
        return send_message(False, "Token mismatch")

    user_model = User.objects.filter(pk = user_id).first()

    new_data = json.loads(request.body.decode())

    new_username = new_data.get('username')
    new_firstName = new_data.get('firstName')
    new_lastName = new_data.get('lastName')
    new_email = new_data.get('email')


    if new_username != user_model.username:
        user_model.username = new_username 

    if new_email != user_model.email:
        user_model.email = new_email 

    if new_lastName != user_model.lastName:
        user_model.lastName = new_lastName 

    if new_firstName != user_model.firstName:
        user_model.firstName = new_firstName 

    user_model.save()

    return HttpResponse(json.dumps({
        "success": True,
        "message": "Edited Successfully",
        "profileInfo": user_model.get_dict()
    }))