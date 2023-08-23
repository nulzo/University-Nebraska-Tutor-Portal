from django.db import models


# Create your models here.
class Ticket(models.Model):
    name = models.CharField(max_length=100)
