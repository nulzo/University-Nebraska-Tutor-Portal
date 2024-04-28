from django.db import models

from api.models.color import Color


class Role(models.Model):
    name = models.CharField(max_length=255)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True)
    description = models.TextField()

    def __str__(self):
        return self.name
