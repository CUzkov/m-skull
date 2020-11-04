from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """extend user model"""

    birthday = models.DateField(null=True, blank=True)
    profile_image = models.ImageField(null=True, blank=True)
    status = models.CharField(max_length=20, default='')
    likes = models.PositiveIntegerField(default=0)
    likes_file_user_id_file = models.FileField(upload_to='likes/', blank=True)
    dislikes = models.PositiveIntegerField(default=0)
    dislikes_user_id_file = models.FileField(upload_to='dislikes/', blank=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return str(self.id)
