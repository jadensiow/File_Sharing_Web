import boto3
from backend.backend.config import Config

def delete_from_s3(object_keys: list) -> bool:
    if (
        not isinstance(object_keys, list) and 
        not isinstance(object_keys, tuple) and  
        not isinstance(object_keys, set)
    ):
        raise TypeError("You must pass an iterable as the parameter")


    s3_client = boto3.resource('s3')

    for key in object_keys:
        obj_to_delete = s3_client.Object(Config.AWS_STORAGE_BUCKET_NAME, key)
        print(f'\nobj_to_delete = {obj_to_delete}\n')
        obj_to_delete.delete()

    