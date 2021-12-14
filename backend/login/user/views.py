from django.shortcuts import render
from .serializers import *
from login.user.models import User
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import filters
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework import mixins
from django.utils.crypto import get_random_string
import threading
from django.core.mail import *
from django.http import HttpResponse

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = IsAdminUser,
    queryset = User.objects.all()

class RegistrationViewSet(viewsets.ModelViewSet, jwt_views.TokenObtainPairView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user_activation_key = get_random_string(length=32) + request.data['username']
        activation = AccountActivation(user = user, key = user_activation_key)
        activation.save()
        profile = Profile(user = user)
        profile.save()
        refresh = RefreshToken.for_user(user)
        #res = {
          #  "refresh": str(refresh),
         #   "access": str(refresh.access_token),
        #}

        self.send_confirmation_email(user_activation_key)

        return Response({
            "user": serializer.data,
            #"refresh": res["refresh"],
            #"token": res["access"]
        }, status=status.HTTP_201_CREATED)

    def send_confirmation_email(self, key):
        activation_link = "http://localhost:3000/activateaccount/?key=" + key
        message = "Hola. Para activar tu cuenta en el sitio, por favor clickea en el siguiente enlace: \r\n" + activation_link
        msg = EmailMessage("Activa tu cuenta", message, "emsm26091996@gmail.com", ["somozaemanuel@gmail.com"],headers={'Reply-To': "emsm26091996@gmail.com"})
        t = threading.Thread(target=self.send,args=[msg],daemon=True)
        t.start()
    
    def send(self,msg):
        print("asd2")
        msg.send(fail_silently=False)

class LoginViewSet(viewsets.ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class ProfileViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class RegisteredUsersViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes= (AllowAny,)
    serializer_class = RegisteredUsersSerializer

    def get_queryset(self):
        return User.objects.filter(username = self.request.GET['username'], is_active=True)

class RegisteredEmailsViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes= (AllowAny,)
    serializer_class = RegisteredEmailsSerializer

    def get_queryset(self):
        return User.objects.filter(email = self.request.GET['email'], is_active=True)

class ActivateAccountViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes= (AllowAny,)
    serializer_class = ActivateAccountSerializer
    
    def create(self, request):
        key = request.data['key']
        account_to_activate = AccountActivation.objects.filter(key = key).first()
        if (account_to_activate != None):
            user_to_activate = User.objects.filter(id = account_to_activate.user.id).first()
            user_to_activate.is_active = True
            user_to_activate.save()
            account_to_activate.delete()
            return HttpResponse(status= 200)
        return HttpResponse(status = 404)

        


