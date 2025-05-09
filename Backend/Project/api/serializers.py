from rest_framework import serializers
from .models import Post, Profile
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class UserShortSerializer(serializers.ModelSerializer):
    profile_photo = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'profile_photo', 'first_name', 'last_name']

    def get_profile_photo(self, obj):
        if hasattr(obj, 'profile') and obj.profile.profile_photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile.profile_photo.url)
        return None

class PostSerializer(serializers.ModelSerializer):
    author = UserShortSerializer(read_only=True)
    image = serializers.ImageField(use_url=True, required=False)
    
    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ['author']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'profile_photo']

class UserSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)
    profile = ProfileSerializer()
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'posts', 'profile']






class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only = True,
        required = True,
        validators = [validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)


    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        
        return user