from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    text = models.TextField()
    image = models.ImageField(upload_to='post_media/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

def default_avatar():
    return 'avatars/default.png'

def user_avatar_path(instance, filename):
    return f'avatars/user_{instance.user.id}/{filename}'

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    profile_photo = models.ImageField(upload_to=user_avatar_path, default=default_avatar)

    def __str__(self):
        return f'{self.user.username} Profile'