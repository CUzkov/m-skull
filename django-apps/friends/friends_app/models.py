from django.db import models


class Friend(models.Model):

    friends_file = models.TextField(blank=True, null=True)
    user_id = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return str(self.user_id)
