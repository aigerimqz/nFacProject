from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Post
from .serializers import PostSerializer, UserSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class PostListView(generics.ListAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer


# Create your views here.
@permission_classes([IsAuthenticated])
class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    parser_classes = [MultiPartParser, FormParser]
  
    def perform_create(self, serializer):
        serializer.save(author = self.request.user)

class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]



@permission_classes([IsAuthenticated])
class UpdatePostView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    def perform_update(self, serializer):
        if self.get_object().author != self.request.user:
            raise PermissionDenied("You can not change post.")
        serializer.save()


@permission_classes([IsAuthenticated])
class DeletePostView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionDenied("You can not delete post.")
        instance.delete()


@permission_classes([IsAuthenticated])
class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user