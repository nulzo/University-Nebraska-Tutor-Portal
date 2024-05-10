from django.db import models


class Color(models.Model):
    name = models.CharField(max_length=100, unique=True)
    hex_color = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=500)

    class Meta:
        verbose_name_plural = "colors"

    def __str__(self):
        return str(self.name)
