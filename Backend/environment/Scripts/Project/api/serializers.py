from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelField):
    class Meta:
        model = Post
        fields = "__all__"
        