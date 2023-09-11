from django.db import models


# Create your models here.
class Professor(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
