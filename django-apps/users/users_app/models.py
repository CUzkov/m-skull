from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """extend user model"""

    birthday = models.DateField(null=True, blank=True)
    profile_image = models.ImageField(
        upload_to='images/',
        default='/home/cuzkov/www.m-skull.ru/users/unnamed.jpg'
    )
    status = models.CharField(max_length=50, default='', blank=True)
    likes = models.PositiveIntegerField(default=0)
    likes_user_id = models.TextField(blank=True, default='')
    dislikes = models.PositiveIntegerField(default=0)
    dislikes_user_id = models.TextField(blank=True, default='')
    email = models.EmailField(unique=True)

    def __str__(self):
        return str(self.id)
