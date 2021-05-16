# Project_Planner_App

http://file-sharing-webapp.s3-website-ap-southeast-1.amazonaws.com/

## Description

To have a server to record and share precious memories with others. Users are able to post the stories of their lives and store them in their account. The videos are stored on the server and other users can access to see what are being shared.

### Features

- Users are able to upload their videos and images into their own accounts. The uploaded videos can be edited and deleted after posting
<img src="https://media.giphy.com/media/EErCCKnRoD0rk5PxcE/giphy.gif" width="800px">

- Users can customize their own profile page and channel banner
![Untitled](https://user-images.githubusercontent.com/78722564/118407821-038f7080-b6b5-11eb-813e-0a8808f03e83.png)

- Users can like and comment on other users videos. Users can also edit and delete their own post
![Animation10](https://user-images.githubusercontent.com/78722564/118406852-5b77a880-b6b0-11eb-8cc1-74a22321e7e4.gif)

- Users will have random recommendations of the channels and subscribed to the channels
![Animation11](https://user-images.githubusercontent.com/78722564/118406914-bc06e580-b6b0-11eb-83aa-8a15769d5160.gif)

- Users can search for channels or videos on the site
![Animation13](https://user-images.githubusercontent.com/78722564/118406942-db9e0e00-b6b0-11eb-99c1-bf9aa9fc36a9.gif)

## Technologies used

AWS(EC2, S3 and RDS) , Docker, ReactJS, Redux, Danjngo, JWT, Postgresql and Lodash

## Install

To run this, NodeJS and npm are required

Firstly, run npm install on the frontend

```
npm install
```

Secondly, inside frontend > src > apiurl, change the api according to your server

Next, create a config.py file inside the backend root folder and type in the following

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

Run

```
pip install -r requirements.txt
```

Start the backend in the virtual environment while the front end with npm start
