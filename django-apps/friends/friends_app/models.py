from django.db import models


class Friend(models.Model):

    friends_file = models.FileField(upload_to='')
    user_id = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return str(self.user_id)
