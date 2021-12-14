from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import *
from .serializers import *
from django.http import HttpResponse

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class TasksByFileViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TasksByFileSerializer
    
    def get_queryset(self):
        user = User.objects.filter(username = int(self.request.GET['file'])).first()
        if (user != None):
            return Task.objects.order_by("-date").filter(user = user.id)
        else:
            return {}

class TasksByDateViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TasksByDateSerializer

    def get_queryset(self):
        return Task.objects.order_by("-date").filter(date__range=[self.request.GET['start_date'], self.request.GET['end_date']])

class TasksByDateAndFileViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TasksByFileAndDateSerializer

    def get_queryset(self):
        user = User.objects.filter(username = self.request.GET['file']).first()
        if (user != None):
            return Task.objects.order_by("-date").filter(user = user.id, date__range=[self.request.GET['start_date'], self.request.GET['end_date']])
        else:
            return {}


class TasksByUserViewSet(viewsets.ModelViewSet):
    serializer_class = TasksByUserSerializer

    def get_queryset(self):
        return Task.objects.order_by("-date").filter(user = self.request.GET['user'])


