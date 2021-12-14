from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.core.exceptions import ObjectDoesNotExist


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)
        
        userid = UserSerializer(self.user).data['id']
        profile = Profile.objects.filter(user= userid).first()

        data['profile'] = ProfileSerializer(profile).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['staff'] = User.objects.filter(id = userid).first().is_staff

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data

class RegisterSerializer(UserSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
    email = serializers.EmailField(required=True, write_only=True, max_length=128)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        try:
            user = User.objects.get(email=validated_data['email'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class RegisteredUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class RegisteredEmailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email',)

class ActivateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountActivation
        fields = ('key',)
