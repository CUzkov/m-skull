from django.db import models


class Friend(models.Model):

    user_friends = models.TextField(blank=True)
    user_id = models.PositiveIntegerField(unique=True)
    my_friends_q = models.PositiveIntegerField(default=0)
    i_following_q = models.PositiveIntegerField(default=0)
    my_followers_q = models.PositiveIntegerField(default=0)

    def __str__(self):
        return str(self.user_id)
