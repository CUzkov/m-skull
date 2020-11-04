from django.conf import settings


def add_file_to_model(field, obj):
    path_to_file = (
        str(settings.MEDIA_ROOT) +
        f'{field}/' +
        str(obj.id) +
        '.txt'
    )
    with open(path_to_file, 'w+') as f:
        f.write('')
    if field == 'likes':
        obj.liked_users_id_file.name = str(obj.id) + '.txt'
    if field == 'comments':
        obj.comments_file.name = str(obj.id) + '.txt'
    obj.save()
