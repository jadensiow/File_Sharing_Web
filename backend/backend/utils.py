import json
from django.http.response import HttpResponse
import jwt
from backend.backend.config import Config

def get_s3_key_from_s3_url(video_s3_urls: list) -> list:
    if (
        not isinstance(video_s3_urls, list) and 
        not isinstance(video_s3_urls, tuple) and  
        not isinstance(video_s3_urls, set)
    ):
        raise TypeError("You must pass an iterable as the parameter")

    video_s3_keys = []

    for url in video_s3_urls:
        if len(url) > 0:
            if url[-1] == '/':
                url = url[:-1]

            video_s3_keys.append(url[url.rfind('/') + 1:])

    return video_s3_keys

def send_message(success: bool, message: str) -> HttpResponse:
    '''
    Takes a success parameter and message and sends it as json 
    '''

    return HttpResponse(
        json.dumps({
            'success': success,
            'message': message
        })
    )


def login_required(function):
    def wrapper(*args, **kwargs):
        request = args[0]

        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return HttpResponse(
                json.dumps({
                    "success": False,
                    "message": "Token not found"
                })
            )

        try:
            token = None
            t = auth_header.split(' ')
            if t[0].strip() == 'Bearer':
                token = t[1].strip()


            user = jwt.decode(
                token,
                key = Config.JWT_SECRET,
                algorithms = [Config.JWT_HASH_ALGO]
            )

        except:
            return HttpResponse(
                json.dumps({
                    "success": False,
                    "message": "Token validation falied"
                })
            )

        
        new_kwargs = {**kwargs, 'user': user}

        return function(*args, **new_kwargs)

    return wrapper


