from django.db import models
from datetime import *
from login.user.models import *

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    description = models.TextField(max_length=3000, null=False, default="")
    title = models.TextField(max_length=50, null=False, default="")
    date = models.DateField(null=False, default=date.today().isoformat())