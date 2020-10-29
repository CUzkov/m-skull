from django.db import models


class Subscriber(models.Model):

    subscribers = models.FileField(upload_to='')
    user_id = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return str(self.user_id)
