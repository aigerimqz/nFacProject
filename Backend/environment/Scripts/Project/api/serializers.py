from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User

class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Post
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'posts']