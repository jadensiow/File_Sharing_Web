import os

class Config:
    JWT_SECRET = 'slkfsldkfjewirhwiohwfjsdf'
    JWT_HASH_ALGO = 'HS256'
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = 'youtube-videoupload'
    AWS_REGION = 's3-ap-southeast-1.amazonaws.com'
    S3_BASE_URL = f"https://{AWS_STORAGE_BUCKET_NAME}.{AWS_REGION}"
    AWS_S3_FILE_OVERWRITE = False
    AWS_DEFUALT_ACL = None
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
