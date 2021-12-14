from .models import *
from rest_framework import serializers
from login.user.serializers import *
from login.user.models import *


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('user','description','title')

class TasksByFileSerializer(serializers.ModelSerializer):
    user_data = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ('description','title','date','user_data')

    def get_user_data(self,obj):
        user_data = User.objects.filter(task=obj)
        return UserFileSerializer(user_data,many=True).data[0]


class ProfileFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('name',)

class UserFileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username','name')

    def get_name(self,obj):
        name = Profile.objects.filter(user=obj)
        return ProfileFileSerializer(name, many=True).data[0]['name']

class TasksByDateSerializer(serializers.ModelSerializer):
    user_data = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ('description','title','date','user_data')

    def get_user_data(self,obj):
        user_data = User.objects.filter(task=obj)
        return UserFileSerializer(user_data,many=True).data[0]

class TasksByFileAndDateSerializer(serializers.ModelSerializer):
    user_data = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ('description','title','date','user_data')

    def get_user_data(self,obj):
        user_data = User.objects.filter(task=obj)
        return UserFileSerializer(user_data,many=True).data[0]

class TasksByUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'