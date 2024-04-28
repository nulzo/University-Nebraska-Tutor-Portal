from django.db import models

from api.models.color import Color


class Difficulty(models.Model):
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True)
    icon = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    discriminator = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "difficulties"

    def __str__(self):
        return self.name
