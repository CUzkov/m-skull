from django.db import models


class Friend(models.Model):

    user_friends = models.TextField(blank=True)
    user_id = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return str(self.user_id)
