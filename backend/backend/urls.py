from rest_framework.routers import SimpleRouter
from login.user.views import *
from tareas.views import *
from django.urls import path
from django.contrib import admin

routes = SimpleRouter()

routes.register(r'user', UserViewSet, basename='user')
routes.register(r'profile', ProfileViewSet, basename="profile")
routes.register(r'login', LoginViewSet, basename='login')
routes.register(r'register', RegistrationViewSet, basename='register')
routes.register(r'refresh', RefreshViewSet, basename='refresh')
routes.register(r'registeredusers',RegisteredUsersViewSet, basename='registeredusers')
routes.register(r'registeredemails',RegisteredEmailsViewSet, basename='registeredemails')
routes.register(r'activateaccount', ActivateAccountViewSet, basename='activateaccount')
routes.register(r'tasks', TaskViewSet, basename="tasks")
routes.register(r'tasksbyfile', TasksByFileViewSet, basename="tasksbyfile")
routes.register(r'tasksbydate', TasksByDateViewSet, basename="tasksbydate")
routes.register(r'tasksbydateandfile', TasksByDateAndFileViewSet, basename="tasksbydateandfile")
routes.register(r'tasksbyuser', TasksByUserViewSet, basename="tasksbyuser")

urlpatterns = [
    *routes.urls,
    path('admin/', admin.site.urls),
]

