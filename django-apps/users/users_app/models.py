from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """extend user model"""

    birthday = models.DateField(null=True, blank=True)
    profile_image = models.ImageField(
        null=True,
        blank=True,
        upload_to='images/'
    )
    status = models.CharField(max_length=20, default='')
    likes = models.PositiveIntegerField(default=0)
    likes_user_id = models.TextField()
    dislikes = models.PositiveIntegerField(default=0)
    dislikes_user_id = models.TextField()
    email = models.EmailField(unique=True)

    def __str__(self):
        return str(self.id)
