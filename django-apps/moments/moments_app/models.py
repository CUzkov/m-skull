from django.db import models


class Moment(models.Model):
    """moment model class"""

    title = models.TextField()
    description = models.TextField(blank=True)
    user_id = models.PositiveIntegerField()
    creation_date = models.DateField()
    date_of_update = models.DateField()
    likes = models.PositiveIntegerField(default=0)
    # photos
    # comments
    # liked_users_id
    # tags

    def __str__(self):
        return str(self.title)
