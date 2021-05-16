# Project_Planner_App

## Description

To have a server to record and share precious memories with others. Users are able to post the stories of their lives and store them in their account. The videos are stored on the server and other users can access to see what are being shared.

### Features

- Users are able to upload their videos and images into their own accounts. The uploaded videos can be edited and deleted after posting

- Users can like and comment on other users videos. Users can also edit and delete their own post

- Users will have random recommendations of the channels and subscribed to the channels

- Users can search for channels or videos on the site

## Technologies used

AWS, Docker, ReactJS, Redux, Danjngo, JWT, Postgresql and Lodash

## Install

To run this, NodeJS and npm are required

Firstly, run npm install on the frontend

```
npm install
```

Next, create a config.py file inside backend place in the following

```
import os

class Config:
    JWT_SECRET = <Your Key>
    JWT_HASH_ALGO = 'HS256'
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = <Bucket name>
    AWS_REGION = <Region name>
    S3_BASE_URL = f"https://{AWS_STORAGE_BUCKET_NAME}.{AWS_REGION}"
    AWS_S3_FILE_OVERWRITE = False
    AWS_DEFUALT_ACL = None
    DEFAULT_FILE_STORAGE = <Storage name>
```
