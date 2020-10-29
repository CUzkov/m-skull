from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """extend user model"""

    birthday = models.DateField(null=True, blank=True)
    profile_image = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20, default='')
    # Доп функционал
    # balance = models.PositiveIntegerField(default=10000)
    # likes = models.PositiveIntegerField(default=0)
    # dislikes = models.PositiveIntegerField(default=0)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.id
