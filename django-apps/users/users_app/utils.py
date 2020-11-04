from django.conf import settings


def add_file_to_model(field, obj):
    """add empty file to model user"""
    path_to_file = (
        str(settings.MEDIA_ROOT) +
        f'{field}/' +
        str(obj.id) +
        '.txt'
    )
    with open(path_to_file, 'w+') as f:
        f.write('')
    if field == 'likes':
        obj.likes_file_user_id_file.name = str(obj.id) + '.txt'
    if field == 'dislikes':
        obj.dislikes_user_id_file.name = str(obj.id) + '.txt'
    obj.save()
