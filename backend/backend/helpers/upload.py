import boto3
from backend.config import Config
from uuid import uuid4

def upload_file(file_to_upload, username: str) -> str:
    '''
    Uploads to S3 and returns the S3 URL for the object
    '''

    uid = str(uuid4())

    session = boto3.Session(
        aws_access_key_id = Config.AWS_ACCESS_KEY_ID,
        aws_secret_access_key = Config.AWS_SECRET_ACCESS_KEY,
    )

    s3_client = session.resource('s3')
    file_name = f'{username}-{uid}-{file_to_upload.name}'

    s3_client.Bucket(
        Config.AWS_STORAGE_BUCKET_NAME
    ).put_object(
        Key = file_name, 
        Body = file_to_upload
    )

    object_acl = s3_client.ObjectAcl(Config.AWS_STORAGE_BUCKET_NAME,file_name)
    object_acl.put(ACL='public-read')

    s3_url = f"{Config.S3_BASE_URL}/{file_name}"

    return s3_url