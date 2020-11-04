from django.db import models


class Moment(models.Model):
    """moment model class"""

    title = models.TextField(blank=True)
    description = models.TextField(blank=True)
    user_id = models.PositiveIntegerField()
    creation_date = models.DateTimeField(blank=True)
    date_of_update = models.DateTimeField(blank=True)
    likes = models.PositiveIntegerField(default=0)
    comments_file = models.FileField(upload_to='comments/', blank=True)
    liked_users_id_file = models.FileField(upload_to='likes/', blank=True)
    # tags

    def __str__(self):
        return str(self.title)


class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    image_name = models.CharField(max_length=300)
    moment = models.ForeignKey(
        Moment,
        on_delete=models.CASCADE,
        related_name='images'
    )

    def __str__(self):
        return str(self.image_name)
