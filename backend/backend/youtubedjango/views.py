from django.http import HttpResponse
import json

def home(request):
    return HttpResponse(
        json.dumps({"message": "Connected Successfully..."})
    )